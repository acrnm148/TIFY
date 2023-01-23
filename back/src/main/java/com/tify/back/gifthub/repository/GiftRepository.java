package com.tify.back.gifthub.repository;


import com.tify.back.gifthub.entity.Gift;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GiftRepository extends JpaRepository<Gift, Long> {
}
