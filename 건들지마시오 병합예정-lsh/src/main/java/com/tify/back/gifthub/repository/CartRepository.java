package com.tify.back.gifthub.repository;


import com.tify.back.gifthub.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
