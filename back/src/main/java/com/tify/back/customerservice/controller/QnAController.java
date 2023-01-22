package com.tify.back.customerservice.controller;

import com.tify.back.customerservice.dto.FileUploadDTO;
import com.tify.back.customerservice.entity.QnA;
import com.tify.back.customerservice.entity.QnAFile;
import com.tify.back.customerservice.repository.QnAFileRepository;
import com.tify.back.customerservice.service.QnAFileService;
import com.tify.back.customerservice.service.QnAService;
import com.tify.back.userpack.entity.User;

import com.tify.back.userpack.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/qna")
public class QnAController {
    private final QnAService qnaService;
    private final QnAFileService qnaFileService;
    private final UserService userService;

    private final QnAFileRepository qnaFileRepository;

    @GetMapping
    public List<QnA> findAll() {
        return qnaService.findAll();
    }

//    @PostMapping
//    public QnA save(@RequestBody QnA qna) {
//        return qnaService.save(qna);
//    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        QnA qna = qnaService.findById(id);
        qnaService.delete(qna);
    }

    public FileUploadDTO uploadFile(@RequestParam("file") MultipartFile file, Long qnaId) {
        String fileName = qnaFileService.storeFile(file,qnaId);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();
        return new FileUploadDTO(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping
    public QnA create(@RequestParam("id") Long id
                    ,@RequestParam("userId") Long userId
                    ,@RequestParam("title") String title
                    ,@RequestParam("content") String content
                    ,@RequestParam("type") Integer type
                    ,@RequestParam("files") MultipartFile[] files) {
        QnA qna = new QnA();
        qna.setTitle(title);
        qna.setContent(content);
        qna.setType(type);
        User user = new User();
        user.setEmail("dsadsa@ndsad.com");
        user.setNickname("dsadsa");
        user.setPassword("dsadsa");
        user.setRole("admin");
        user.setBirth("2000-01-01");
        user.setTel("010-0000-0000");
        user.setAddr1("dsadsa");
        user.setAddr2("dsadsa");
        user.setZipcode("dsadsa");
        user.setProfImgUrl("dsadsa");
        user.setProvider("dsadasa");
        user.setProviderId("321");
        user.setCreateDate(Timestamp.valueOf("2000-01-01 00:00:00"));
        user.setUsername("dsadsa");
        System.out.println(userId);
        System.out.println("1111111111111111111111111111111111111");
        System.out.println(user.toString());
        user = userService.save(user);
        System.out.println(user.toString());


//        qna.setUser(userRepository.findById(userId).orElse(null));
        qna.setUser(user);
        qnaService.save(qna);
        List<QnAFile> includes = new ArrayList<>();

        List<FileUploadDTO> fileList = Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file,qna.getId()))
                .collect(Collectors.toList());
        for (FileUploadDTO file : fileList) {
//            System.out.println(file.getFileDownloadUri());
            System.out.println("11111111111111=-================================================================");
        }
        includes.addAll(qnaFileRepository.findByQnAId(qna.getId()));
        System.out.println( qnaFileRepository.findByQnAId(qna.getId()).size() );
        qna.setFiles(includes);
        System.out.println(includes.size());
        return qnaService.save(qna);
    }

}
