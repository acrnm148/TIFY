package com.tify.back.userpack.dto;

import java.security.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserDTO {
	private Long user_id;
	private String nickname;
	private String username;
	private String email;
	private String role;
	private String birth;
	private String tel;
	private String addr1;
	private String addr2;
	private String zipcode;
	private String profImgUrl;
	private String provider;
	private String providerId;
	private Timestamp createDate;
	private boolean pendingFriendRequest;
	private boolean friend;
}

