package com.tify.back.oauth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tify.back.model.User;
import com.tify.back.oauth.provider.Token.GoogleToken;
import com.tify.back.oauth.provider.profile.GoogleProfile;
import com.tify.back.oauth.provider.profile.KakaoProfile;
import com.tify.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GoogleService {

    private final UserRepository userRepository;

    private final String client_id = "097d883a03c0da953d919d990701da5f";
    private final String client_secret = "af5un2n5wi857RPKyB7wBFPKhjBBebd4";
    private final String redirect_uri = "http://localhost:8080/login/oauth2/code/google";
    private final String accessTokenUri = "https://accounts.google.com/o/oauth2/token";
    private final String UserInfoUri = "https://www.googleapis.com/oauth2/v2/userinfo"; //-> 구글은 userInfoUri없음

    /**
     * 구글로 부터 엑세스 토큰을 받는 함수
     */
    public GoogleToken getAccessToken(String code) {

        //요청 param (body)
        MultiValueMap<String , String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id",client_id );
        params.add("redirect_uri", redirect_uri);
        params.add("code", code);
        params.add("client_secret", client_secret);
        params.add("scope", "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar");


        //request
        WebClient wc = WebClient.create(accessTokenUri);
        System.out.println("here~~~~:"+accessTokenUri);
        //System.out.println("here~~~~:"+wc.post().toString());
        String response = wc.post()
                .uri(accessTokenUri)
                .body(BodyInserters.fromFormData(params))
                .header("Content-type","application/x-www-form-urlencoded;charset=utf-8" ) //요청 헤더
                .retrieve()
                .bodyToMono(String.class)
                .block();

        System.out.println("response:" + response);


        //json형태로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        GoogleToken googleToken =null;

        try {
            googleToken = objectMapper.readValue(response, GoogleToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return googleToken;
    }

    /**
     * 사용자 정보 가져오기
     */
    public GoogleProfile findProfile(String token) {

        System.out.println("===========google  findProfile=================");
        //Http 요청
        WebClient wc = WebClient.create(UserInfoUri);
        String response = wc.post()
                .uri(UserInfoUri)
                .header("Authorization", "Bearer " + token)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(String.class)
                .block();

        ObjectMapper objectMapper = new ObjectMapper();
        GoogleProfile googleProfile = null;


        try {
            googleProfile = objectMapper.readValue(response, GoogleProfile.class);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        System.out.println("===========googleProfile=================");
        System.out.println(googleProfile);

        return googleProfile;
    }

    /**
     * 구글 로그인 사용자 강제 회원가입
     */
    @Transactional
    public User saveUser(String access_token) {
        GoogleProfile profile = findProfile(access_token); //사용자 정보 받아오기
        User user = userRepository.findByUserid(profile.getId());

        //처음이용자 강제 회원가입
        if(user ==null) {
            user = User.builder()
                    .userid(profile.getId())
                    .password(null) //필요없으니 일단 아무거도 안넣음. 원하는데로 넣으면 됌
                    .nickname(profile.getKakao_account().getProfile().getNickname())
                    .profileImg(profile.getKakao_account().getProfile().getProfile_image_url())
                    .email(profile.getKakao_account().getEmail())
                    .roles("USER")
                    .createTime(LocalDateTime.now())
                    .provider("Google")
                    .build();

            userRepository.save(user);
        }

        return user;
    }
}
