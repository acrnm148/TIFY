package com.tify.back.dto.gifthub;

import lombok.Data;

import java.util.List;

@Data
public class DeliveryDto {
    private String complete;
    private String deliveryNumber;
    private String itemName;
    private String result;
    private List<TrackingDetailDto> list;
}
