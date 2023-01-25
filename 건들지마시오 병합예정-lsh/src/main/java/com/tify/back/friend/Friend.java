package com.tify.back.friend;

import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "friends")
@Getter
@Setter
public class Friend {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "user_id")
	private long userId;

	@Column(name = "friend_id")
	private long friendId;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private FriendStatus status;

	// getters and setters
}

@Getter
enum FriendStatus {
	REQUESTED, ACCEPTED, REJECTED, BLOCKED
}