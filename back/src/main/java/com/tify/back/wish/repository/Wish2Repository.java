package com.tify.back.wish.repository;

import com.tify.back.gifthub.entity.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Wish2Repository extends JpaRepository<Wish, Long> {
}
