package com.tify.back.model.wish;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "thkcard")
public class Thkcard {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title")
	private String title;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "content")
	private String content;

	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "pay_id")
	private Long payId;
}
