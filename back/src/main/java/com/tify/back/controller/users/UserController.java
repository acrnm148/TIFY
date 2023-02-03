package com.tify.back.controller.users;
import com.tify.back.dto.users.UserDTO;
import com.tify.back.dto.admin.createUserDto;
import com.tify.back.model.users.User;
import com.tify.back.service.users.UserService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
	private final UserService userService;
	public UserController(UserService userService) {
		this.userService = userService;
	}
	@GetMapping("/searchuser/{nickname}")
	public List<UserDTO> searchUserByNickname(@PathVariable String nickname) {
		List<User> users = userService.searchUserByNickname(nickname);
		List<UserDTO> userDTOs = new ArrayList<>();
		for (User user : users) {
			UserDTO userDTO = new UserDTO();
			userDTO.setId(user.getId());
			userDTO.setProfileImg(user.getProfileImg());
			userDTO.setNickname(user.getNickname());
			userDTO.setEmail(user.getEmail());
			userDTOs.add(userDTO);
		}
		return userDTOs;
	}

}
