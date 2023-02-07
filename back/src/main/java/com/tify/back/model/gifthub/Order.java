package com.tify.back.model.gifthub;


import com.tify.back.common.BaseEntity;
import com.tify.back.model.users.User;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "order_table")
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY) // 노비 파트는 fetch 타입 영향 안받음.
    private Gift gift;
    private String tel;
    private int gatheredPrice;
    private int orderPrice;
    private String deliveryNumber;
    private LocalDateTime createdDate;
    private int state; // 주문 상태 코드화

    @Builder
    public Order(String deliveryNumber, User user, Gift gift, String tel, int gatheredPrice, int orderPrice, int state, LocalDateTime createdDate) {
        this.user = user;
        this.gift = gift;
        this.tel = tel;
        this.gatheredPrice = gatheredPrice;
        this.orderPrice = orderPrice;
        this.state = state;
        this.createdDate = createdDate;
        this.deliveryNumber= deliveryNumber;
    }
}
