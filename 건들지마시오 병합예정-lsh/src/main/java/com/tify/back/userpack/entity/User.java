package com.tify.back.userpack.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

// ORM - Object Relation Mapping

@ToString
@Builder
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_table")
public class User {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long user_id;
    @Column(name = "nickname", length = 50)
    private String nickname;
    @Column(name = "username", length = 50)
    private String username;
    @Column(name = "password", nullable = true)
    private String password;
    @Column(name = "email", length = 200, nullable = false)
    private String email;
    @Column(name = "role")
    private String role; //ROLE_USER, ROLE_ADMIN
    @Column(name = "birth")
    private String birth;
    @Column(name = "tel")
    private String tel;
    @Column(name = "addr1")
    private String addr1;
    @Column(name = "addr2")
    private String addr2;
    @Column(name = "zipcode")
    private String zipcode;
    @Column(name = "prof_img_url")
    private String profImgUrl;

    // OAuth를 위해 구성한 추가 필드 2개 - 일반사용자인지 소셜사용자인지 구분하기 위함
    @Column(name = "provider")
    private String provider;
    @Column(name = "providerId")
    private String providerId;
    @CreationTimestamp //자동 생성
    @Column(name = "createDate", nullable = false, updatable = false)
    private Timestamp createDate;

//    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
//    private Cart cart;
}