package com.tify.back.repository.wish;

import com.tify.back.model.pay.Pay;
import com.tify.back.model.wish.Thkcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThkcardRepository extends JpaRepository<Thkcard, Long> {
	Thkcard findByPay(Pay pay);
}
//
