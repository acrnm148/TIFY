package com.javatechie.crud.example.repository;

import com.javatechie.crud.example.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishRepository extends JpaRepository<Wish, Integer> {
}
