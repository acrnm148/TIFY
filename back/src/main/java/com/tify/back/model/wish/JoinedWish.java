package com.tify.back.model.wish;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table
public class JoinedWish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "join_id")
    private Long id;

    private Long userId;

    private Long wishId;

    private Long payId;
}
