package com.tify.back.model.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tify.back.auth.jwt.refreshToken.RefreshToken;
import com.tify.back.model.gifthub.Cart;
import com.tify.back.model.pay.Pay;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="user_id")
    private Long id;

    private String userid; //일반사용자-입력한 아이디, 카카오 사용자-카카오 고유 id(provider id)
    @JsonIgnore
    private String password;
    private String roles; //USER,ADMIN 게 넣을것이다.

    private String provider;
    private String nickname;
    private String profileImg;
    private String username;
    private String birth;
    private String email;
    private String tel;
    private String addr1;
    private String addr2;
    private String zipcode;
    private String birthYear;
    private String gender;
    private Boolean emailAuth; //이메일인증 - 인증링크 클릭 시, 권한 상태 업데이트

    private LocalDateTime createTime;
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "refreshToken_id")
    private RefreshToken jwtRefreshToken;

    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;


    /**
     *  refresh 생성자, setter
     */
    public void createRefreshToken(RefreshToken refreshToken) {
        this.jwtRefreshToken = refreshToken;
    }
    public void SetRefreshToken(String refreshToken) {
        System.out.println("로그인 후 set refresh token 진입:"+ refreshToken + " "+this.jwtRefreshToken);
        this.jwtRefreshToken.setRefreshToken(refreshToken);
    }
    public void updateRefreshToken(RefreshToken refreshToken) {
        this.jwtRefreshToken = refreshToken;
    }
    public void updatePassword(String password) {
        this.password = password;
    }

    /**
     * 사용자가 다양한 권한을 가지고 있을수 있음
     */
    public List<String> getRoleList() {
        if(this.roles.length()>0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    public void emailVerifiedSuccess() {this.emailAuth = true;}
}
