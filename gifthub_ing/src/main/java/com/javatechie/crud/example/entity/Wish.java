package com.javatechie.crud.example.entity;

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
@Table(name = "wish")
public class Wish {
    @Id
    @GeneratedValue
    @Column(name = "wish_id")
    private int id;

    @OneToMany(mappedBy= "wish")
    private List<Gift> giftItems = new ArrayList<>();

    private int totPrice;

}
