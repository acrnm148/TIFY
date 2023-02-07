package com.tify.back.auth.jwt;

public interface JwtProperties {

    String SECRET = "TIFYby88RisingSsafyBugE208JwtAccessTokenRefreshToken88RisingThisisforyouTify"; //우리 서버만 알고 있는 비밀값
    int AccessToken_TIME =  3600000; //(ms) 1시간 (1000=1초)
    int RefreshToken_TIME = 1209600000;//(ms) 2주
    String ACCESS_HEADER_STRING = "accessToken";
    String REFRESH_HEADER_STRING = "refreshToken";

}
