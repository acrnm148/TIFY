package com.tify.back.controller.wish;

import com.tify.back.dto.wish.ThkcardDto;
import com.tify.back.model.pay.Pay;
import com.tify.back.model.wish.Thkcard;
import com.tify.back.repository.wish.ThkcardRepository;
import com.tify.back.service.wish.ThkcardService;
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
	private final ThkcardRepository thkcardRepository;

	@PostMapping
	public Thkcard saveThkcard(@RequestBody ThkcardDto thkcardDto) {
		Thkcard thkcard = new Thkcard();
		thkcard.setTitle(thkcardDto.getTitle());
		thkcard.setPhoneNumber(thkcardDto.getPhoneNumber());
		thkcard.setContent(thkcardDto.getContent());
		thkcard.setImageUrl(thkcardDto.getImageUrl());
		thkcard.setUserId(thkcardDto.getUserId());
		thkcard.setPay(thkcardDto.getPay());
		return thkcardService.saveThkcard(thkcard);
	}

	@GetMapping("/{user_id}")
	public Thkcard findThkcardByPay(@PathVariable Long user_id) {
		return thkcardService.findByPayId(user_id);
	}
}
