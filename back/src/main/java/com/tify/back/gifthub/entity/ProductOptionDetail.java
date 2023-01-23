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
@Table(name = "product_option_detail")
public class ProductOptionDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_option_detail_id")
    private Long id;
    private String content;
    private int value; //옵션 추가요금
    private int idx; // detail 정렬 순서
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_option_id")
    private ProductOption productOption;

    public ProductOptionDetail(String content, int value, int idx, ProductOption option) {
        this.content = content;
        this.value = value;
        this.idx = idx;
        this.productOption = option;
    }
}
