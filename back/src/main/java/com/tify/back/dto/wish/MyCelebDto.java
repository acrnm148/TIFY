package com.tify.back.dto.wish;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.Date;

@Data
@Builder
public class MyCelebDto {
    private Long giftId;
    private String giftImgUrl;
    private String giftName;
    private String amount;
    private String payedDate;
}
