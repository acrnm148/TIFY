package com.tify.back.dto.wish;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThkcardDto {

	private String title;
	private String phoneNumber;
	private String content;
	private String imageUrl;
	private Long payId;
}