package com.tify.back.controller.customerservice;


import com.tify.back.dto.customerservice.FileUploadDTO;
import com.tify.back.service.customerservice.QnAFileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class QnAFileController {
    private final QnAFileService qnaFileService;


    //단일 파일 업로드
    // 파일 업로드만 test 했고 qna 게시글과 연동시켜야함.
    @PostMapping("/uploadFile")
    public FileUploadDTO uploadFile(@RequestParam("file") MultipartFile file, Long qnaId) {
        String fileName = qnaFileService.storeFile(file,qnaId);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();
        return new FileUploadDTO(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }
    // 다중
    @PostMapping("/uploadMultipleFiles")
    public List<FileUploadDTO> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files,Long id) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file,id))
                .collect(Collectors.toList());
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // 파일을 Resource타입으로 받아온다.
        Resource resource = qnaFileService.loadFileAsResource(fileName);

        // 파일 content type 확인 (jpg, png 등..)
        String contentType = null;
        String encodedFileName = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            encodedFileName = URLEncoder.encode(resource.getFilename(),"UTF-8").replaceAll("\\+", "%20");
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // 파일 타입을 알 수 없는 경우의 기본값
        // 파일 타입을 알 수 없는 경우의 기본값
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFileName + "\"")
                .body(resource);
    }

}