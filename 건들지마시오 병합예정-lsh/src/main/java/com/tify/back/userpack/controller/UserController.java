package com.tify.back.userpack.controller;

import com.tify.back.userpack.dto.UserDTO;
import com.tify.back.userpack.entity.User;
import com.tify.back.userpack.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/search/{nickname}")
	public ResponseEntity<List<UserDTO>> searchUsersByNickname(@PathVariable String nickname) {
		List<UserDTO> userDTOs = userService.searchUsersByNickname(nickname);
		return ResponseEntity.ok(userDTOs);
	}
}
