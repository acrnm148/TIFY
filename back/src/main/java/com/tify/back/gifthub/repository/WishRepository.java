package com.tify.back.gifthub.repository;

import com.tify.back.gifthub.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishRepository extends JpaRepository<Wish, Long> {
}
