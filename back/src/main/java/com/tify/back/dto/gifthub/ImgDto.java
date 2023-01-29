package com.tify.back.dto.gifthub;

import com.tify.back.model.gifthub.Img;
import com.tify.back.model.gifthub.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImgDto {
    private String url;
    private int idx;

    public Img toEntity() {
        Img img = new Img();
        img.setUrl(this.url);
        img.setIdx(this.idx);
        return img;
    }
}
