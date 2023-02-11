package com.tify.back.dto.pay.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefundRequestDto {
    private Long userId;
    private Long orderId;
    private String refState;
    private String account;
    private String bank;
    private String userName;
}
