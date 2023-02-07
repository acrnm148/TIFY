package com.tify.back.model.customerservice;

import com.tify.back.common.BaseEntity;

import com.tify.back.model.users.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "qna")
public class QnA extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String title;
    private String content;
    private boolean ansYN;
    private int type;

    @OneToMany(mappedBy = "qna", cascade = CascadeType.ALL)
    private List<QnAFile> files;
    @OneToMany(mappedBy = "qna", cascade = CascadeType.ALL)
    private List<Answer> answers;

}

