package com.tify.back.service.friend;

import com.tify.back.dto.friend.FriendDTO;
import com.tify.back.model.friend.Friend;
import com.tify.back.model.friend.FriendStatus;
import com.tify.back.repository.friend.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FriendService {

    @Autowired
    private FriendRepository friendRepository;

    public List<Friend> getFriends(long userId) {
        return friendRepository.findByUserIdAndStatus(userId, FriendStatus.ACCEPTED);
    }

    public Long getFriendshipId(long userId1, long userId2) {
        Friend friend = friendRepository.findByUserIdAndFriendId(userId1, userId2);
        if (friend != null) {
            return friend.getId();
        }
        friend = friendRepository.findByUserIdAndFriendId(userId2, userId1);
        if (friend != null) {
            return friend.getId();
        }
        return null;
    }

    public FriendStatus getFriendshipStatus(long userId1, long userId2) {
        Friend friend = friendRepository.findByUserIdAndFriendIdAndStatus(userId1, userId2, FriendStatus.ACCEPTED);
        if (friend != null) {
            return FriendStatus.ACCEPTED;
        }

        friend = friendRepository.findByUserIdAndFriendIdAndStatus(userId1, userId2, FriendStatus.REQUESTED);
        if (friend != null) {
            return FriendStatus.REQUESTED;
        }

        friend = friendRepository.findByUserIdAndFriendIdAndStatus(userId2, userId1, FriendStatus.REQUESTED);
        if (friend != null) {
            return FriendStatus.RECEIVED;
        }

        return FriendStatus.NONE;
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
    public List<Friend> getPendingRequests(long userId) {
        return friendRepository.findByUserIdAndStatus(userId, FriendStatus.REQUESTED);
    }

    public List<Friend> getReceivedRequests(long userId) {
        return friendRepository.findByFriendIdAndStatus(userId, FriendStatus.REQUESTED);
    }
}
