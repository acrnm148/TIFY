package com.tify.back.customerservice.dto;

import com.tify.back.customerservice.entity.QnAFile;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
public class FileDTO {
    private Long id;
    private String originName;
    private String fileName;
    private String filePath;
}

