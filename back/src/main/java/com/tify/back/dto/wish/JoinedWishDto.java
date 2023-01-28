package com.tify.back.dto.wish;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinedWishDto {
    private Long userId;

    private Long wishId;

    private Long payId;
}
