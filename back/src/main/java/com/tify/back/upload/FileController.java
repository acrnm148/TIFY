package com.tify.back.upload;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private S3Services s3Services;

    @PostMapping("/upload")
    public ResponseEntity<Object> uploadFile(@RequestPart("file") MultipartFile file) throws IOException {
        try {
            if (file.getSize() > 3 * 1024 * 1024) {
                throw new FileSizeException("File size should not exceed 3MB");
            }

            String fileUrl = s3Services.uploadFile(file.getOriginalFilename(), file.getInputStream());
            return ResponseEntity.ok(fileUrl);
        } catch (FileSizeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}