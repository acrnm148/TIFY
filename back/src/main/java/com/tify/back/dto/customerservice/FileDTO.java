package com.tify.back.dto.customerservice;

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

