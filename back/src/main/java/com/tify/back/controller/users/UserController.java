package com.tify.back.controller.users;
import com.tify.back.model.users.User;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.service.users.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

	@PostMapping("/tempuser")
	public User tempUser() {
		return userService.save(new User());
	}
}
