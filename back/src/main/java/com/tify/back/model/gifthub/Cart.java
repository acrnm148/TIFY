package com.tify.back.model.gifthub;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tify.back.model.users.User;
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

    @JsonIgnore
    @OneToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL) //cart가 주인
    @JoinColumn(name = "user_id")
    private User user;
}
