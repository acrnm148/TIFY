package com.javatechie.crud.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.javatechie.crud.example.service.ImgService;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import com.javatechie.crud.example.common.CommonMethods;
@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private int id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

//    private int quantity;
    @JsonIgnore // json 할때 무시하고 json 생성, image에서 product는 mapping용이면 충분
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cart_id") //OrderItem은 하나의 Order만 가진다. => order_id 매핑
    private Cart cart;

    private int quantity;
}
