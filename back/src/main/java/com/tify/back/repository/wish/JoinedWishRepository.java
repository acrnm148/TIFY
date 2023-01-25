package com.tify.back.repository.wish;


import com.tify.back.model.wish.JoinedWish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JoinedWishRepository extends JpaRepository<JoinedWish, Long> {
}
