package com.tify.back.repository.gifthub;



import com.tify.back.model.gifthub.Gift;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GiftRepository extends JpaRepository<Gift, Long> {
}
