package com.tify.back.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderStateDto {
    private Long orderId;
    private String deliveryNumber;
    private int state;
}
