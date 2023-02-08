package com.tify.back.controller.customerservice;


import com.tify.back.dto.customerservice.FileUploadDTO;
import com.tify.back.dto.customerservice.QnADto;
import com.tify.back.model.customerservice.QnA;
import com.tify.back.model.customerservice.QnAFile;
import com.tify.back.model.users.User;
import com.tify.back.repository.customerservice.QnAFileRepository;
import com.tify.back.repository.customerservice.QnARepository;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.service.customerservice.QnAFileService;
import com.tify.back.service.customerservice.QnAService;
import com.tify.back.service.users.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/qna")
public class QnAController {
    private final QnAService qnaService;
    private final QnAFileService qnaFileService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final QnAFileRepository qnaFileRepository;
    private final QnARepository qnARepository;

    //10개씩
    @GetMapping(produces = "application/json")
    public Page<QnA> findAll(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "max_result", required = false) Integer max_result) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result), Sort.by("createdDate").descending());
        return qnARepository.pagingAll(pageable);
    }

    @GetMapping(value="/search/{userPk}",produces = "application/json")
    public Page<QnA> qnaSearch(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "max_result", required = false) Integer max_result,
                               @PathVariable("userPk") Long userPk) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result), Sort.by("createdDate").descending());
        User user = userRepository.findById(userPk).orElse(null);
        return qnARepository.findAllByUser(user, pageable);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public QnA findById(@PathVariable Long id) {
        return qnaService.findById(id);
    }

    @PutMapping(value ="/{qnaId}")
    public QnA updateFAQ(@RequestBody QnADto dto,@PathVariable Long qnaId) {
        QnA existingQnA = qnaService.findById(qnaId);
        existingQnA.setTitle(dto.getTitle());
        existingQnA.setContent(dto.getContent());
        existingQnA.setType(dto.getType());
        List<QnAFile> existFiles = qnaFileRepository.findByQnAId(existingQnA.getId());
        for (QnAFile qnaFile : existFiles) {
            qnaFileService.deleteFile(qnaFile);
        }

        List<QnAFile> includes = new ArrayList<>();
        if (dto.getFiles().length > 0) {
            List<FileUploadDTO> fileList = Arrays.asList(dto.getFiles())
                    .stream()
                    .map(file -> uploadFile(file,existingQnA.getId()))
                    .collect(Collectors.toList());

            includes.addAll(qnaFileRepository.findByQnAId(existingQnA.getId()));
            existingQnA.setFiles(includes);
            System.out.println(includes.size());
        }
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
    public QnA create(QnADto dto) {
        QnA qna = dto.toEntity(userRepository);
        qnaService.save(qna);
        List<QnAFile> includes = new ArrayList<>();
        List<FileUploadDTO> fileList = Arrays.asList(dto.getFiles())
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
