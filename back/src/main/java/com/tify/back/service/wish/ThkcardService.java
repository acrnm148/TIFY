package com.tify.back.service.wish;

import com.tify.back.model.wish.Thkcard;
import com.tify.back.repository.wish.ThkcardRepository;
import org.springframework.stereotype.Service;

@Service
public class ThkcardService {
	private final ThkcardRepository thkcardRepository;

	public ThkcardService(ThkcardRepository thkcardRepository) {
		this.thkcardRepository = thkcardRepository;
	}

	public Thkcard saveThkcard(Thkcard thkcard) {
		return thkcardRepository.save(thkcard);
	}

	public Thkcard findByPayId(Long payId) {
		return thkcardRepository.findByPayId(payId);
	}
}

