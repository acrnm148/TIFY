package com.tify.back.model.users;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_auth")
@Data
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public class EmailAuth {

    private static final Long MAX_EXPIRE_TIME = 5L;

    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String authToken;
    private Boolean expired;
    private LocalDateTime expireDate;

    @Builder
    public EmailAuth(String email, String authToken, Boolean expired) {
        this.email = email;
        this.authToken = authToken;
        this.expired = expired;
        this.expireDate = LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME);
    }

    public void useToken() {
        this.expired = true;
    }
}