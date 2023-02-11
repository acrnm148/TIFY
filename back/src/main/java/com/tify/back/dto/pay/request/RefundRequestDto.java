package com.tify.back.dto.pay.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefundRequestDto {
    private Long userId;
    private Long orderId;
    private String userName;
    private String bank;
    private String account;
}
