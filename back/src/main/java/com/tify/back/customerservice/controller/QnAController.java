package com.tify.back.customerservice.controller;

import com.tify.back.customerservice.dto.FileUploadDTO;
import com.tify.back.customerservice.entity.FAQ;
import com.tify.back.customerservice.entity.QnA;
import com.tify.back.customerservice.entity.QnAFile;
import com.tify.back.customerservice.repository.QnAFileRepository;
import com.tify.back.customerservice.service.QnAFileService;
import com.tify.back.customerservice.service.QnAService;
import com.tify.back.exception.FAQNotFoundException;
import com.tify.back.userpack.entity.User;

import com.tify.back.userpack.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    //10개씩
    @GetMapping(value = "/list/{page}", produces = "application/json")
    public List<QnA> findAll(@PathVariable Integer page) {
        int maxResult = 10;
        Pageable pageable = PageRequest.of(page, Math.min(10, maxResult), Sort.by("createdDate").descending());
        List<QnA> qnas = qnaService.findAll(pageable);
        return qnas;
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public QnA findById(@PathVariable Long id) {
        return qnaService.findById(id);
    }

    @PutMapping(value ="/{qnaId}")
    public QnA updateFAQ(@PathVariable Long qnaId
            ,@RequestParam("id") Long id
            ,@RequestParam("userId") Long userId
            ,@RequestParam("title") String title
            ,@RequestParam("content") String content
            ,@RequestParam("type") Integer type
            ,@RequestParam("files") MultipartFile[] files) {
        QnA existingQnA = qnaService.findById(qnaId);
        existingQnA.setTitle(title);
        existingQnA.setContent(content);
        existingQnA.setType(type);
        List<QnAFile> aleadyfiles = existingQnA.getFiles();
        for (QnAFile qnaFile : aleadyfiles) {
            qnaFileService.deleteFile(qnaFile);
        }

        List<QnAFile> includes = new ArrayList<>();

        List<FileUploadDTO> fileList = Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file,existingQnA.getId()))
                .collect(Collectors.toList());

        includes.addAll(qnaFileRepository.findByQnAId(existingQnA.getId()));
        existingQnA.setFiles(includes);
        System.out.println(includes.size());
        return qnaService.save(existingQnA);
    }

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

        user = userService.save(user);


//        qna.setUser(userRepository.findById(userId).orElse(null));
        qna.setUser(user);
        qnaService.save(qna);
        List<QnAFile> includes = new ArrayList<>();

        List<FileUploadDTO> fileList = Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file,qna.getId()))
                .collect(Collectors.toList());

        includes.addAll(qnaFileRepository.findByQnAId(qna.getId()));
        System.out.println( qnaFileRepository.findByQnAId(qna.getId()).size() );
        qna.setFiles(includes);
        System.out.println(includes.size());
        return qnaService.save(qna);
    }

}
