package com.tify.back.dto.gifthub;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class CartPageRequest extends PageRequest {
    private int cart_total_quantity;
    private int cart_total_price;

    public CartPageRequest(int page, int size, Sort sort, int cart_total_quantity, int cart_total_price) {
        super(page, size, sort);
        this.cart_total_quantity = cart_total_quantity;
        this.cart_total_price = cart_total_price;
    }

    public int getCart_total_quantity() {
        return cart_total_quantity;
    }

    public int getCart_total_price() {
        return cart_total_price;
    }
}
