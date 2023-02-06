package com.tify.back.repository.gifthub;



import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.Product;
import com.tify.back.model.wish.Wish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GiftRepository extends JpaRepository<Gift, Long> {
    public Optional<Gift> findById(Long gift_id);

    Page<Gift> findAll(Pageable pageable);
    Page<Gift> findByWish(Pageable pageable, Wish wish);

}
