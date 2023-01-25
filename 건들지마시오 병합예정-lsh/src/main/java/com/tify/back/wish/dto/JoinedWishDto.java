package com.tify.back.wish.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinedWishDto {
    private Long userId;

    private Long wishId;

    private Long payId;
}
