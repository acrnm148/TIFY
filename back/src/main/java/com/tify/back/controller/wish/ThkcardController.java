package com.tify.back.controller.wish;

import com.tify.back.dto.wish.ThkcardDto;
import com.tify.back.model.wish.Thkcard;
import com.tify.back.service.wish.ThkcardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/thkcards")
public class ThkcardController {
	private final ThkcardService thkcardService;

	public ThkcardController(ThkcardService thkcardService) {
		this.thkcardService = thkcardService;
	}

	@PostMapping
	public Thkcard saveThkcard(@RequestBody ThkcardDto thkcardDto) {
		Thkcard thkcard = new Thkcard();
		thkcard.setTitle(thkcardDto.getTitle());
		thkcard.setPhoneNumber(thkcardDto.getPhoneNumber());
		thkcard.setContent(thkcardDto.getContent());
		thkcard.setImageUrl(thkcardDto.getImageUrl());
		thkcard.setPayId(thkcardDto.getPayId());
		return thkcardService.saveThkcard(thkcard);
	}

	@GetMapping("/{payId}")
	public Thkcard findThkcardByPayId(@PathVariable Long payId) {
		return thkcardService.findByPayId(payId);
	}
}
