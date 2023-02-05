package com.tify.back.controller.users;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.service.users.UserService;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tify.back.dto.users.SearchedUserDto;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserService userService;

	@GetMapping("/searchuser/{nickname}")
	public List<SearchedUserDto> searchUserByNickname(@PathVariable String nickname, @RequestHeader("Authorization") String token) {
		String newToken = token.substring(7);
		String email = userService.getUserid(newToken);
		System.out.println(userRepository.ownFindByEmail(email));
		Long myId = userRepository.ownFindByEmail(email).getId();

		List<SearchedUserDto> users = userService.searchUserByNickname(nickname,myId);
		return users;
	}

}

