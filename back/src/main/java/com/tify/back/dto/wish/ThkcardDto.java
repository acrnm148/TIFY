package com.tify.back.dto.wish;

import com.tify.back.model.pay.Pay;
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
	private Pay pay;
}