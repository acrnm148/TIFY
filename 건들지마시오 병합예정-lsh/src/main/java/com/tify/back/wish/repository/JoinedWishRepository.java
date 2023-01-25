package com.tify.back.wish.repository;

import com.tify.back.wish.entity.JoinedWish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JoinedWishRepository extends JpaRepository<JoinedWish, Long> {
}
