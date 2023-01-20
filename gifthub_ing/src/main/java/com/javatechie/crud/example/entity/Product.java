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
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue
    @Column(name = "product_id")
    private int id;
    @Column(name = "product_name")
    private String name;

    @OneToMany(mappedBy="product",fetch = FetchType.LAZY)
    private List<Img> imgList = new ArrayList<>();;
    private int quantity; // count 대신
    private int price;
    private String description;

    @Column(name = "category_id")
    private int category; // category

    private int likeCount;

    @JsonIgnore
    @OneToOne(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    private CartItem cartItem;

}
