package com.javatechie.crud.example.common;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

public class CartDTO {
    private Integer cartId;
    private Integer productId;

    public Integer getCartId() {
        return cartId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }
}

