package com.tify.back.model.gifthub;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tify.back.model.users.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "order_table")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private Long wishId;
    private String wishName;
    private String giftImgUrl;
    private String wishFinishDate;
    private String giftName;
    private String userOption;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY) // 노비 파트는 fetch 타입 영향 안받음.
    @JoinColumn(name = "gift_id")
    private Gift gift;

    private String tel;
    private int gatheredPrice;
    private int orderPrice;
    private String deliveryNumber;
    private LocalDateTime createdTime;
    private String createdDt;
    private int state; // 주문 상태 코드화

    private String refState; //환불상태
    private String refUserName; //환불 원하는 유저 이름
    private String refUserBank; //환불 은행
    private String refUserAccount; //환불 계좌

    @Builder
    public Order(String refState, String refUserName, String refUserBank, String refUserAccount, String userOption, String giftImgUrl, String wishFinishDate, String wishName, Long wishId, String deliveryNumber, User user, Gift gift, String tel, int gatheredPrice, int orderPrice, int state, LocalDateTime createdTime, String createdDt, String giftName) {
        this.refState = refState;
        this.refUserName = refUserName;
        this.refUserBank = refUserBank;
        this.refUserAccount = refUserAccount;
        this.giftImgUrl = giftImgUrl;
        this.wishFinishDate = wishFinishDate;
        this.userOption = userOption;
        this.giftName = giftName;
        this.wishName = wishName;
        this.wishId = wishId;
        this.user = user;
        this.gift = gift;
        this.tel = tel;
        this.gatheredPrice = gatheredPrice;
        this.orderPrice = orderPrice;
        this.state = state;
        this.createdTime = createdTime;
        this.createdDt = createdDt;
        this.deliveryNumber= deliveryNumber;
    }
}
