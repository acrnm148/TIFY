package com.tify.back.auth.jwt.refreshToken;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Data
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refreshToken_id")
    private Long id;

    @Column(name = "refreshToken", length = 500)
    private String refreshToken;

    @Column(name = "user_id", length = 500)
    private String userid;

    @Builder
    public RefreshToken(String refreshToken, String userid) {
        this.refreshToken = refreshToken;
        this.userid = userid;
    }
}
