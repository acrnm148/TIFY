package com.tify.back.service.wish;

import com.tify.back.model.pay.Pay;
import com.tify.back.model.wish.Thkcard;
import com.tify.back.repository.pay.PayRepository;
import com.tify.back.repository.wish.ThkcardRepository;
import java.util.List;
import java.util.Optional;

import com.tify.back.service.pay.PayService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ThkcardService {
	private final PayRepository payRepository;
	private final ThkcardRepository thkcardRepository;
	public Thkcard saveThkcard(Thkcard thkcard) {
		return thkcardRepository.save(thkcard);
	}

	public List<Thkcard> findAllByUserId(Long userId) {
		return thkcardRepository.findAllByUserId(userId);
	}

	/**
	 * 축하카드(pay)에 맵핑되는 감사카드 불러오기
	 */
	public Thkcard getThkcardByCelebcard( Long payId ) {
		Pay pay = payRepository.findById(payId).get();
		Thkcard thkcard = thkcardRepository.findByPay(pay);
		return thkcard;
	}
}
