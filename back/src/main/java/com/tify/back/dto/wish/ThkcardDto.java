package com.tify.back.dto.wish;

import com.tify.back.model.wish.Thkcard;
import com.tify.back.repository.pay.PayRepository;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThkcardDto {

	private String title;
	private String phoneNumber;
	private String content;
	private String imageUrl;
	private Long userId;
	private Long payId;

	public Thkcard toEntity(PayRepository payRepository) {
		Thkcard card = new Thkcard();
		card.setTitle(this.title);
		card.setContent(this.content);
		card.setPhoneNumber(this.phoneNumber);
		card.setImageUrl(this.imageUrl);
		card.setPay(payRepository.findById(this.payId).orElse(null));
		card.setUserId(this.userId);
		return card;
	}
}