package com.javatechie.crud.example.repository;

import com.javatechie.crud.example.entity.Cart;
import com.javatechie.crud.example.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
}
