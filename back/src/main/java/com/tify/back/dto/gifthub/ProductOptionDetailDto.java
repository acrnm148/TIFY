package com.tify.back.dto.gifthub;

import com.tify.back.model.gifthub.ProductOptionDetail;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductOptionDetailDto {
    private int idx;
    private String content;
    private String value;
    public ProductOptionDetail toEntity() {
        ProductOptionDetail productOptionDetail = new ProductOptionDetail();
        productOptionDetail.setContent(this.content);
        productOptionDetail.setValue(Integer.parseInt(this.value.replace(",", "")));
        productOptionDetail.setIdx(this.idx);
        return productOptionDetail;
    }
}
