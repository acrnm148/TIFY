package com.tify.back.service.wish;

import static com.tify.back.model.pay.QPay.pay;

import com.tify.back.model.pay.Pay;
import com.tify.back.model.wish.Thkcard;
import com.tify.back.repository.pay.PayRepository;
import com.tify.back.repository.wish.ThkcardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ThkcardService {
	private final ThkcardRepository thkcardRepository;
	private final PayRepository payRepository;
	public Thkcard saveThkcard(Thkcard thkcard) {
		return thkcardRepository.save(thkcard);
	}

	public Thkcard findByPayId(Long pay_id) {
		Pay pay = payRepository.findById(pay_id).orElse(null);
		return thkcardRepository.findByPay(pay);
	}
}

