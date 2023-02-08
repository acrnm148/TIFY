package com.tify.back.repository.wish;

import com.tify.back.model.pay.Pay;
import com.tify.back.model.wish.Thkcard;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThkcardRepository extends JpaRepository<Thkcard, Long> {
	Thkcard findByUserId(Long userId);
	List<Thkcard> findAllByUserId(Long userId);
}
//
