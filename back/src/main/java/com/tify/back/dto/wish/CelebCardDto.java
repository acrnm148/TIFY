package com.tify.back.dto.wish;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CelebCardDto {
    private Long payId;
    private String celebFrom;
    private String celebContent;
    private String celebImg;
}
