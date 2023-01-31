package com.tify.back.dto.gifthub;

import com.tify.back.model.gifthub.Cart;
import com.tify.back.repository.gifthub.ProductRepository;
import com.tify.back.repository.users.UserRepository;

public class CartDTO {
    private Long userId;
    private Long productId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}

