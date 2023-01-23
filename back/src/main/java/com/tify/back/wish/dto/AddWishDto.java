package com.tify.back.wish.dto;

import com.tify.back.gifthub.entity.Gift;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AddWishDto {
    private List<Gift> giftItem;
    private Integer totalPrice;
    private String nowPrice;
    //얘도 int형으로
    private String wishTitle;
    private String wishContent;
    private String category;
    private String finishYN;
    //boolean으로 하는게 좋을듯
    private Date startDate;
    private Date endDate;
    private Integer wishCard;
    //url이라 스트링이 맞을듯 카드이미지가 공통코드라 숫자인가?????
    private String addr1;
    private String addr2;
    private String zipCode;

}
