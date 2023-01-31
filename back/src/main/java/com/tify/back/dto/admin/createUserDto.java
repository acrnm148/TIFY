package com.tify.back.dto.admin;

import com.tify.back.model.users.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class createUserDto {
    private String userid; // 진짜 id, pk용 id가 아님
    private String password;
    private String roles;
    private String username;
    private String birth;
    private String email;
    private String tel;
    private String birthYear;
    private String gender;
    private LocalDateTime createTime;

    public User toEntity() {
        User user = new User();
        user.setUserid(this.userid);
        user.setPassword(this.password);
        user.setRoles(this.roles);
        user.setUsername(this.username);
        user.setEmail(this.email);
        user.setBirth(this.birth);
        user.setTel(this.tel);
        user.setBirthYear(this.birthYear);
        user.setGender(this.gender);
        user.setCreateTime(LocalDateTime.now());
        return user;
    }
}
