package com.tify.back.repository.wish;

import com.tify.back.dto.admin.UserListMap;
import com.tify.back.model.friend.Friend;
import com.tify.back.model.wish.Wish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {
    @Query("SELECT w FROM Wish w ORDER BY w.createDate DESC")
    Page<Wish> findAllWishes(Pageable pageable);
    List<Wish> findByUserId(long userId);
    List<Wish> findAllByGiftItems(Long giftItem);
}
