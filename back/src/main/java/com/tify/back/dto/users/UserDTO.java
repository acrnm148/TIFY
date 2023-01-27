package com.tify.back.dto.users;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	private Long id;
	private String nickname;
	private String email;

}