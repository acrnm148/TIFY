package com.tify.back.model.wish;

import com.tify.back.model.pay.Pay;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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
	@Column(name = "userId")
	private Long userId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pay_id")
	private Pay pay;

}
