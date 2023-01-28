package com.tify.back.controller.users;
import com.tify.back.model.users.User;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.service.users.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/searchuser/{nickname}")
	public List<User> searchUserByNickname(@PathVariable String nickname) {
		return userService.searchUserByNickname(nickname);
	}
}
