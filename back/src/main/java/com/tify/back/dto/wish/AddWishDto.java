package com.tify.back.dto.wish;

import com.tify.back.model.gifthub.Gift;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AddWishDto {
    private List<Gift> giftItem;
    private Integer totalPrice;
    private Integer nowPrice;
    private String wishTitle;
    private String wishContent;
    private String category;
    private String finishYN;
    private Date startDate;
    private Date endDate;
    private Integer wishCard;
    private String addr1;
    private String addr2;
    private String zipCode;

}
