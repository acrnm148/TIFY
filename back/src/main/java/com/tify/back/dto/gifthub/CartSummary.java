package com.tify.back.dto.gifthub;

import org.springframework.beans.factory.annotation.Value;

public interface CartSummary {
    @Value("#{target.quantity}")
    Integer getQuantity();
    @Value("#{target.repImg}")
    String getRepImg();
    @Value("#{target.user_id}")
    Integer getUser_Id();
}
