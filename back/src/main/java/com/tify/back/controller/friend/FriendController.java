package com.tify.back.controller.friend;

import com.tify.back.dto.friend.FriendAcceptanceDTO;
import com.tify.back.dto.friend.FriendDTO;
import com.tify.back.model.friend.Friend;
import com.tify.back.model.friend.FriendStatus;
import com.tify.back.service.friend.FriendService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class FriendController {

    @Autowired
    private FriendService friendService;

    @GetMapping("/friends/{userId}")
    public List<Friend> getFriends(@PathVariable long userId) {
        List<Friend> friends = friendService.getFriends(userId);
        List<Friend> pendingRequests = friendService.getPendingRequests(userId);
        List<Friend> receivedRequests = friendService.getReceivedRequests(userId);
        for (Friend friend : friends) {
            friend.setStatus(FriendStatus.ACCEPTED);
        }
        for (Friend pendingRequest : pendingRequests) {
            pendingRequest.setStatus(FriendStatus.REQUESTED);
        }
        for (Friend receivedRequest : receivedRequests) {
            receivedRequest.setStatus(FriendStatus.RECEIVED);
        }
        friends.addAll(pendingRequests);
        friends.addAll(receivedRequests);
        return friends;
    }
    @GetMapping("/friends/{userId1}/{userId2}")
    public FriendStatus getFriendshipStatus(@PathVariable long userId1, @PathVariable long userId2) {
        return friendService.getFriendshipStatus(userId1, userId2);
    }

    @PostMapping("/friends")
    public Friend addFriend(@RequestBody FriendDTO friendDTO) {
        return friendService.addFriend(friendDTO);
    }

    @PostMapping("/friends/accept")
    public Friend acceptFriend(@RequestBody FriendAcceptanceDTO friendAcceptanceDTO) {
        return friendAcceptanceDTO.isAccepted() ? friendService.acceptFriend(friendAcceptanceDTO.getFriendId()) : friendService.rejectFriend(friendAcceptanceDTO.getFriendId());
    }
    //친구 수락할때는 friendID는 친구요청의 id, accepted는 true는 수락 false는 거절
}
