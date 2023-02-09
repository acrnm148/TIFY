package com.tify.back.repository.wish;


import com.tify.back.dto.wish.JoinedWishDto;
import com.tify.back.model.wish.JoinedWish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JoinedWishRepository extends JpaRepository<JoinedWish, Long> {
    public List<JoinedWish> findAllByUserId(Long userId);
    public List<JoinedWish> findAllByUserIdOrderByWishId(Long userId);
}
