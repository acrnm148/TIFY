package com.tify.back.model.noti;

import com.tify.back.common.BaseEntity;
import com.tify.back.model.gifthub.CartItem;
import com.tify.back.model.users.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "noti")
public class Noti extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "noti_id")
    private Long id;

    private String state;
    private String content;
    private String linkPath;
    private String reqeustPath;
    private String method; // request 방법

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
