package com.tify.back.controller.friend;

import com.tify.back.dto.friend.FriendAcceptanceDTO;
import com.tify.back.dto.friend.FriendDTO;
import com.tify.back.model.friend.Friend;
import com.tify.back.service.friend.FriendService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FriendController {

	@Autowired
	private FriendService friendService;

	@GetMapping("/friends/{userId}")
	public List<Friend> getFriends(@PathVariable long userId) {
		return friendService.getFriends(userId);
	}

	@PostMapping("/friends")
	public Friend addFriend(@RequestBody FriendDTO friendDTO) {
		return friendService.addFriend(friendDTO);
	}

	@PostMapping("/friends/accept")
	public Friend acceptFriend(@RequestBody FriendAcceptanceDTO friendAcceptanceDTO) {
		return friendAcceptanceDTO.isAccepted() ? friendService.acceptFriend(friendAcceptanceDTO.getFriendId()) : friendService.rejectFriend(friendAcceptanceDTO.getFriendId());
	}
}




