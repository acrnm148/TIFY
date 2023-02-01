package com.tify.back.repository.wish;

import com.tify.back.model.wish.Thkcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThkcardRepository extends JpaRepository<Thkcard, Long> {
	Thkcard findByPayId(Long payId);
}
//
