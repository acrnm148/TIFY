package com.tify.back.dto.friend;

import com.tify.back.model.friend.FriendStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendEmailDto {
    private Long Id;
    private FriendStatus status;
    private String userid;
}
