package com.tify.back.repository.gifthub;



import com.tify.back.model.gifthub.Gift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GiftRepository extends JpaRepository<Gift, Long> {
    public Optional<Gift> findById(Long gift_id);
}
