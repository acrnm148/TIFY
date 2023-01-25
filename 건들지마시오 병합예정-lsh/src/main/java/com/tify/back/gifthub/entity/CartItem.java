package com.tify.back.gifthub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;


    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

//    private int quantity;
    @JsonIgnore // json 할때 무시하고 json 생성, image에서 product는 mapping용이면 충분
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cart_id") //OrderItem은 하나의 Order만 가진다. => order_id 매핑
    private Cart cart;

    private int quantity;
    private String options;
    private Integer value;
}
