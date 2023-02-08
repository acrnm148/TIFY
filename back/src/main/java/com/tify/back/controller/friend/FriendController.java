package com.tify.back.controller.friend;

import com.tify.back.dto.friend.FriendAcceptanceDTO;
import com.tify.back.dto.friend.FriendDTO;
import com.tify.back.model.friend.Friend;
import com.tify.back.model.friend.FriendStatus;
import com.tify.back.model.wish.Wish;
import com.tify.back.service.friend.FriendService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tify.back.service.wish.WishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class FriendController {

    @Autowired
    private WishService wishService;
    @Autowired
    private FriendService friendService;
    @GetMapping("/wishfriend/{userId}")
    public List<Map<Long,Object>> wishes(@PathVariable long userId) {
        List<Friend> friends = friendService.getFriends(userId);
        List<Map<Long,Object>> data = new ArrayList<>();
        for(Friend friend: friends){
            Map<Long,Object> map = new HashMap<>();
            List<Wish> wishes = wishService.getWish(friend.getFriendId());
            map.put(friend.getId(), wishes);
            data.add(map);
        }
        return data;

    }
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
    @DeleteMapping("friend/reqdelete/{friendId}")
    public void deleteFriendRequest(@PathVariable long friendId) {
        friendService.deleteFriendRequest(friendId);
    }

    @DeleteMapping("friend/delete/{friendId}")
    public void deleteFriend(@PathVariable long friendId) {
        friendService.deleteFriend(friendId);
    }
}

