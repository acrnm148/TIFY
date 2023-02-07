package com.tify.back.dto.admin;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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

    public int getTotPrice() {
        return totPrice;
    }

    public void setTotPrice(int totPrice) {
        this.totPrice = totPrice;
    }

    public int getNowPrice() {
        return nowPrice;
    }

    public void setNowPrice(int nowPrice) {
        this.nowPrice = nowPrice;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFinishYN() {
        return finishYN;
    }

    public void setFinishYN(String finishYN) {
        this.finishYN = finishYN;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getCardImageCode() {
        return cardImageCode;
    }

    public void setCardImageCode(String cardImageCode) {
        this.cardImageCode = cardImageCode;
    }

    public String getAddr1() {
        return addr1;
    }

    public void setAddr1(String addr1) {
        this.addr1 = addr1;
    }

    public String getAddr2() {
        return addr2;
    }

    public void setAddr2(String addr2) {
        this.addr2 = addr2;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
