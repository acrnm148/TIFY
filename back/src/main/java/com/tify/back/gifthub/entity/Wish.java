package com.tify.back.gifthub.entity;

import java.util.Date;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "wish")
public class Wish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wish_id")
    private Long id;

    @OneToMany(mappedBy= "wish")
    private List<Gift> giftItems = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "max_amount")
    private int totPrice;

    @Column(name = "now_amount")
    private String nowPrice;

    private String title;
    private String content;
    private String Category;

    @Column(name = "join_cnt")
    private Integer joinCount;

    private String finishYN;

    @CreationTimestamp //자동 생성
    @Column(name = "createDate", nullable = false, updatable = false)
    private Timestamp createDate;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "card_img_code")
    private Integer cardImageCode;

    private String addr1;
    private String addr2;
    private String zipCode;
}
