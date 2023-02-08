package com.tify.back.model.customerservice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tify.back.common.BaseEntity;
import com.tify.back.model.users.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "answers")
public class Answer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userPk;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "qna_id")
    private QnA qna;
    private String content;
    private String imgUrl;
}

