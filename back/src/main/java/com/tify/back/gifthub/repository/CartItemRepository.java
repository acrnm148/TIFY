package com.tify.back.gifthub.repository;

import com.tify.back.gifthub.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
