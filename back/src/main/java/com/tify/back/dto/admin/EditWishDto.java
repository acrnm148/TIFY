package com.tify.back.dto.admin;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class EditWishDto {
    private int totPrice;
    private int nowPrice;
    private String title;
    private String content;
    private String finishYN;
    private Date endDate;
    private String cardImageCode;
    private String addr1;
    private String addr2;
    private String zipCode;
    private String category;
}
