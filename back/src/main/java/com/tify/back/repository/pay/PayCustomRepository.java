package com.tify.back.repository.pay;

import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.pay.Pay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface PayCustomRepository {
    List<Pay> findMyPayListByGiftId(Gift gift, Long userId);
}
