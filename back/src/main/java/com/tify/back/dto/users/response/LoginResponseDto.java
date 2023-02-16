package com.tify.back.dto.users.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private Long userSeq;
    private String userid;
    private String email;
    private String accessToken;
    private String refreshToken;
    private String roles;
}
