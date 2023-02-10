package com.tify.back.controller.wish;

import com.tify.back.dto.wish.ThkcardDto;
import com.tify.back.model.wish.Thkcard;
import com.tify.back.repository.pay.PayRepository;
import com.tify.back.repository.wish.ThkcardRepository;
import com.tify.back.service.wish.ThkcardService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/thkcards")
public class ThkcardController {
	private final ThkcardService thkcardService;
	private final PayRepository payRepository;

	@PostMapping
	public Thkcard saveThkcard(@RequestBody ThkcardDto thkcardDto) {
		Thkcard thkcard = thkcardDto.toEntity(payRepository);
		return thkcardService.saveThkcard(thkcard);
	}

	@GetMapping("/{userId}")
	public List<Thkcard> findAllByUserId(@PathVariable Long userId) {
		return thkcardService.findAllByUserId(userId);
	}

	/**
	 * payid로 감사카드 불러오기
	 */
	@GetMapping("/match/{celebId}")
	public Thkcard getThkcardByCelebcard(@PathVariable("celebId") Long celebId) {
		Thkcard thkcard = thkcardService.getThkcardByCelebcard(celebId);
		return thkcard;
	}
}