package com.tify.backend.entity;

import java.sql.Timestamp;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// ORM - Object Relation Mapping

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private int id;
    @Column(name = "nickname", length = 50)
    private String nickname;
    @Column(name = "username", length = 50)
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "email", length = 200, nullable = false)
    private String email;
    @Column(name = "role")
    private String role; //ROLE_USER, ROLE_ADMIN

    // OAuth를 위해 구성한 추가 필드 2개 - 일반사용자인지 소셜사용자인지 구분하기 위함
    @Column(name = "provider")
    private String provider;
    @Column(name = "providerId")
    private String providerId;
    @CreationTimestamp //자동 생성
    @Column(name = "createDate", nullable = false, updatable = false)
    private Timestamp createDate;
}