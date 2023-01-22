package com.tify.back.customerservice.service;

import com.tify.back.customerservice.entity.QnAFile;
import com.tify.back.customerservice.repository.QnAFileRepository;
import com.tify.back.customerservice.repository.QnARepository;
import com.tify.back.exception.FileNotFoundException;
import com.tify.back.exception.FileStorageException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QnAFileService {
    private final Environment env;
    private final Path fileLocation;
    @Autowired
    private QnARepository qnaRepository;
    @Autowired
    private QnAFileRepository fileRepository;
    @Autowired
    public QnAFileService(Environment env, QnAFileRepository fileRepository) {
        this.env = env;
        this.fileLocation = Paths.get(env.getProperty("file.uploadDir")).toAbsolutePath().normalize();
        this.fileRepository = fileRepository;
        try {
            Files.createDirectories(this.fileLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file,Long qnaId) {
        // cleanPath : 역슬래시를 /슬래시로 바꿔줌
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            // 저장할 fileStorageLocation 경로 뒤에 파일명을 붙여준다. (경로 조합)
            Path targetLocation = this.fileLocation.resolve(fileName);
            //업로드할 file을 targetLocation에 복사한다. (동일한 이름일 경우 replace)
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            QnAFile fileEntity = QnAFile.builder()
                    .fileName(UUID.randomUUID().toString())
                    .fileSize(file.getSize())
                    .filePath(targetLocation.toString())
                    .originName(FilenameUtils.removeExtension(fileName))
                    .fileContentType(FilenameUtils.getExtension(fileName))
                    .qna(qnaRepository.findById(qnaId).get())
                    .build();
            fileRepository.save(fileEntity);


            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException("File not found " + fileName, ex);
        }
    }
}
