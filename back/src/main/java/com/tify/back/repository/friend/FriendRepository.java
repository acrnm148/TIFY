package com.tify.back.repository.friend;
import com.tify.back.model.friend.Friend;
import com.tify.back.model.friend.FriendStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
	List<Friend> findByUserIdAndStatus(long userId, FriendStatus status);
	Friend findByIdAndStatus(long friendId, FriendStatus status);
	Friend findByUserIdAndFriendIdAndStatus(long userId, long friendId, FriendStatus status);
}
