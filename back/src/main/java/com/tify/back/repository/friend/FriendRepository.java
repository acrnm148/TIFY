package com.tify.back.repository.friend;

import com.tify.back.model.friend.Friend;
import com.tify.back.model.friend.FriendStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    List<Friend> findByUserIdAndStatus(long userId, FriendStatus status);
    List<Friend>  findByFriendIdAndStatus(long friendId, FriendStatus status);
    Friend findByIdAndStatus(long friendId, FriendStatus status);
    Friend findByUserIdAndFriendIdAndStatus(long userId, long friendId, FriendStatus status);

}
