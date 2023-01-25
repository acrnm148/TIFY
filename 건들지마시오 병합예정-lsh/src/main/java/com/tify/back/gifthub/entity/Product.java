package com.tify.back.gifthub.entity;

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
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;
    @Column(name = "product_name")
    private String name;

    @Column(name = "rep_img")
    private String repImg;
    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Img> imgList = new ArrayList<>();
    private int quantity; // count 대신
    private int price;
    private String description;

    @Column(name = "category_id")
    private int category; // category

    private int likeCount;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ProductOption> options;
// focus on product it self
//    @JsonIgnore
//    @OneToOne(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
//    private CartItem cartItem;

}
