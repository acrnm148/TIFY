package com.tify.back.dto.gifthub;

import com.tify.back.model.gifthub.Gift;
import com.tify.back.repository.gifthub.ProductRepository;
import com.tify.back.repository.wish.WishRepository;

public class GiftDto {
    private Long productId;
    private int quantity;
    private String userOption;
    private String type;
    private String finishYN;
    private Integer maxAmount;
    private int purePrice;
    private int gathered;
    private String successYN;
    private Integer idx;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getUserOption() {
        return userOption;
    }

    public void setUserOption(String userOption) {
        this.userOption = userOption;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFinishYN() {
        return finishYN;
    }

    public void setFinishYN(String finishYN) {
        this.finishYN = finishYN;
    }

    public Integer getMaxAmount() {
        return maxAmount;
    }

    public void setMaxAmount(Integer maxAmount) {
        this.maxAmount = maxAmount;
    }

    public int getPurePrice() {
        return purePrice;
    }

    public void setPurePrice(int purePrice) {
        this.purePrice = purePrice;
    }

    public int getGathered() {
        return gathered;
    }

    public void setGathered(int gathered) {
        this.gathered = gathered;
    }

    public String getSuccessYN() {
        return successYN;
    }

    public void setSuccessYN(String successYN) {
        this.successYN = successYN;
    }

    public Integer getIdx() {
        return idx;
    }

    public void setIdx(Integer idx) {
        this.idx = idx;
    }

    public Gift toEntity(ProductRepository productRepository) {
        Gift gift = new Gift();
        gift.setProduct(productRepository.findById(this.productId).orElse(null));
        gift.setQuantity(this.quantity);
        gift.setUserOption(this.userOption);
        gift.setType(this.type);
        gift.setFinishYN(this.finishYN);
        gift.setMaxAmount(this.maxAmount);
        gift.setPurePrice(this.purePrice);
        gift.setGathered(this.gathered);
        gift.setSuccessYN(this.successYN);
        gift.setIdx(this.idx);
        return gift;
    }
}
