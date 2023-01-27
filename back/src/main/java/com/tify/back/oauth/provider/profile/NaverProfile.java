package com.tify.back.oauth.provider.profile;

import lombok.Data;



@Data
public class NaverProfile {

    public String resultcode;
    public String message;
    public Response response;

    @Data
    public class Response {
        public String id;
        public String email;
        public String name;
        public String nickname;
        public String profile_image; //사용자 프로필 사진 URL
        public String age;
        public String gender;
        public String mobile;
        public String mobile_e164;
        public String birthday;
        public String birthyear;

    }
}
