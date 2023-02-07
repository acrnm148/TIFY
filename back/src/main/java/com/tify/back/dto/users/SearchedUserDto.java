package com.tify.back.dto.users;

import com.tify.back.model.friend.FriendStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchedUserDto {
	private Long id;
	private String name;
	private String profileImg;
	private String nickname;
	private String email;
	private FriendStatus state;
}