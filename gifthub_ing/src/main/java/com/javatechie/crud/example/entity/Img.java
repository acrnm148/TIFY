package com.javatechie.crud.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "img")
public class Img {
    @Id
    @GeneratedValue
    @Column(name = "img_id")
    private int id;

    @JsonIgnore // json 할때 무시하고 json 생성, image에서 product는 mapping용이면 충분
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id") //OrderItem은 하나의 Order만 가진다. => order_id 매핑
    private Product product;
    private String url;

    //==생성 메서드==//
    public static Img createImg(Product product, String url){
        Img img = new Img();
        img.setUrl(url);
        img.setProduct(product);
        return img;
    }
}
