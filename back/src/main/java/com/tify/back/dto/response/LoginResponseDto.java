package com.tify.back.dto.response;

import com.tify.back.auth.jwt.refreshToken.RefreshToken;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private Long id;
    private String userid;
    private String accessToken;
    private String refreshToken;
}
