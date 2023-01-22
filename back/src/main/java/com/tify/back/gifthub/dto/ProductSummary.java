package com.tify.back.gifthub.dto;

import org.springframework.beans.factory.annotation.Value;

public interface ProductSummary {
    @Value("#{target.name}")
    String getName();
    @Value("#{target.repImg}")
    String getRepImg();
    @Value("#{target.price}")
    Integer getPrice();
}
