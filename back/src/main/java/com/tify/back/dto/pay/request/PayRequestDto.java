package com.tify.back.dto.pay.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayRequestDto {
    private String amount;
    private String payType;
    private String celebFrom;
    private String celebTel;
    private String celebContent;
    private String celebImgUrl;
    private Long giftId;

}
