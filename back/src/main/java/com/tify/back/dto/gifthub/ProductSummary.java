package com.tify.back.dto.gifthub;

import org.springframework.beans.factory.annotation.Value;

public interface ProductSummary {
    @Value("#{target.name}")
    String getName();
    @Value("#{target.repImg}")
    String getRepImg();
    @Value("#{target.price}")
    Integer getPrice();
    @Value("#{target.id}")
    Long getId();


}
