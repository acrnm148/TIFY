package com.tify.back.dto.admin;

import org.springframework.beans.factory.annotation.Value;

public interface UserListMap {
    @Value("#{target.id}")
    String getId();
    @Value("#{target.userid}")
    String getUserid();
    @Value("#{target.tel}")
    String getTel();
    @Value("#{target.profileImg}")
    String getProfileImg();
    @Value("#{target.email}")
    String getEmail();
    @Value("#{target.username}")
    String getUsername();
}
