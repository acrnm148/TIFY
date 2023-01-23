package com.tify.back.gifthub.dto;

public class CartDTO {
    private Long cartId;
    private Long productId;

    public Long getCartId() {
        return cartId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}

