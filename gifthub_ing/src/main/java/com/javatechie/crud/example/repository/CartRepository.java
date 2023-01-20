package com.javatechie.crud.example.repository;

import com.javatechie.crud.example.entity.Cart;
import com.javatechie.crud.example.entity.Img;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}
