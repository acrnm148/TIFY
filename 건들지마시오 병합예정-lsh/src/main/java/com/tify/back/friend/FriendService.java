package com.tify.back.friend;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FriendService {

	@Autowired
	private FriendRepository friendRepository;

	public List<Friend> getFriends(long userId) {
		return friendRepository.findByUserIdAndStatus(userId, FriendStatus.ACCEPTED);
	}

	public Friend addFriend(FriendDTO friendDTO) {
		// check if mutual friend already exists
		Friend mutualFriend = friendRepository.findByUserIdAndFriendIdAndStatus(friendDTO.getUserId(), friendDTO.getFriendId(), FriendStatus.ACCEPTED);
		if(mutualFriend == null) {
			Friend friend = new Friend();
			friend.setUserId(friendDTO.getUserId());
			friend.setFriendId(friendDTO.getFriendId());
			friend.setStatus(FriendStatus.REQUESTED);
			return friendRepository.save(friend);
		}
		return null;
	}

	public Friend acceptFriend(long friendId) {
		Friend friend = friendRepository.findByIdAndStatus(friendId, FriendStatus.REQUESTED);
		if (friend != null) {
			friend.setStatus(FriendStatus.ACCEPTED);
			friendRepository.save(friend);
			Friend mutualFriend = new Friend();
			mutualFriend.setUserId(friend.getFriendId());
			mutualFriend.setFriendId(friend.getUserId());
			mutualFriend.setStatus(FriendStatus.ACCEPTED);
			return friendRepository.save(mutualFriend);
		}
		return null;
	}

	public Friend rejectFriend(long friendId) {
		Friend friend = friendRepository.findByIdAndStatus(friendId, FriendStatus.REQUESTED);
		if (friend != null) {
			friend.setStatus(FriendStatus.REJECTED);
			return friendRepository.save(friend);
		}
		return null;
	}
}

