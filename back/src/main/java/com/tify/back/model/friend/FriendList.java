package com.tify.back.model.friend;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FriendList {
    private List<Friend> friends;
    private List<Friend> pendingRequests;
    private List<Friend> receivedRequests;

    // getters and setters
}