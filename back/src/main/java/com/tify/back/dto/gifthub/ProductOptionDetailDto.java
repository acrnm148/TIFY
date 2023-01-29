package com.tify.back.dto.gifthub;

import com.tify.back.model.gifthub.ProductOptionDetail;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductOptionDetailDto {
    private String title; // content
    private String price; // price
    private int idx;

    private String content;

    private String value;
    public ProductOptionDetail toEntity() {
        ProductOptionDetail productOptionDetail = new ProductOptionDetail();
        if (this.content == null) {
            productOptionDetail.setContent(this.title);
        }
        else {
            productOptionDetail.setContent(this.content);
        }
        if (this.value == null) {
            productOptionDetail.setValue(Integer.parseInt(this.price.replace(",", "")));
        }
        else {
            productOptionDetail.setValue(Integer.parseInt(this.value.replace(",", "")));
        }
        productOptionDetail.setIdx(this.idx);
        return productOptionDetail;
    }
}
