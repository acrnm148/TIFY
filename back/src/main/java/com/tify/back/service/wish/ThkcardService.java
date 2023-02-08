package com.tify.back.service.wish;

import com.tify.back.model.wish.Thkcard;
import com.tify.back.repository.wish.ThkcardRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ThkcardService {
	private final ThkcardRepository thkcardRepository;
	public Thkcard saveThkcard(Thkcard thkcard) {
		return thkcardRepository.save(thkcard);
	}

	public List<Thkcard> findAllByUserId(Long userId) {
		return thkcardRepository.findAllByUserId(userId);
	}
}
