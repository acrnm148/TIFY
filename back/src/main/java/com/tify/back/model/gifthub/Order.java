package com.tify.back.model.gifthub;


import com.tify.back.common.BaseEntity;
import com.tify.back.model.users.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@Setter
@Getter
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

    private int state; // 주문 상태 코드화
}
