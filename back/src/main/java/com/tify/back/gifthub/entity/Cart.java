package com.tify.back.gifthub.entity;

import com.tify.back.userpack.entity.User;
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
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long id;


    @OneToMany(mappedBy="cart")
    private List<CartItem> cartItems = new ArrayList<>();;
    private int price;
    private int quantity;// count 대신

    @OneToOne(fetch=FetchType.LAZY) //cart가 주인
    @JoinColumn(name = "user_id")
    private User user;
}
