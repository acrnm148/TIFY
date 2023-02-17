package com.tify.back.model.friend;

import javax.persistence.*;

import com.tify.back.model.users.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

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

    @Transient
    private User user;

    public void setUser(Optional<User> userOptional) {
        if (userOptional.isPresent()) {
            this.user = userOptional.get();
        }
    }

    // getters and setters
}
