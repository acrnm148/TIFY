package com.tify.back.repository.pay;

import com.tify.back.model.pay.Pay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayRepository extends JpaRepository<Pay, Long> {
    //public Pay findByPay_id(Long id);
    //public Pay findByGift_id(String gift_id);
}
