package com.tify.back.dto.gifthub;


import com.tify.back.model.gifthub.ProductOption;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductOptionDto {
    private int idx;
    private String title;
    private List<ProductOptionDetailDto> details;

    public ProductOption toEntity() {
        ProductOption productOption = new ProductOption();
        productOption.setTitle(this.title);
        productOption.setIdx(this.idx);
        return productOption;
    }
}
