package com.javatechie.crud.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue
    @Column(name = "cart_id")
    private int id;
    private int quantity;// count 대신

    @OneToMany(mappedBy="cart")
    private List<CartItem> cartItems = new ArrayList<>();;
    private int price;
}
