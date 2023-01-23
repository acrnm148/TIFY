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
@Table(name = "img")
public class Img {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "img_id")
    private Long id;

    @JsonIgnore // json 할때 무시하고 json 생성, image에서 product는 mapping용이면 충분
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id") //OrderItem은 하나의 Order만 가진다. => order_id 매핑
    private Product product;
    private String url;

    private int idx;

    public Img(Product product, String url, int idx) {
        this.product = product;
        this.url = url;
        this.idx = idx;
    }

//    public static Img createImg(Product product, String url){
//        Img img = new Img();
//        img.setUrl(url);
//        img.setProduct(product);
//        return img;
//    }
}
