package com.tify.back.dto.gifthub;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.GiftOption;
import com.tify.back.model.pay.Pay;
import com.tify.back.repository.gifthub.ProductRepository;
import com.tify.back.repository.wish.WishRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import javax.persistence.OneToMany;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class GiftDto {
    private Long id;
    private String giftImgUrl;
    private String giftUrl;
    private Long productId;
    private String giftname;
    private int quantity;
    private String userOption;
    private String type;
    private String finishYN;
    private Integer maxAmount;
    private int purePrice;
    private int gathered;
    private String successYN;
    private Integer idx;
    private List<Pay> payList;
    private List<GiftOption> giftOptionList;

    public List<Pay> getPayList() {
        return payList;
    }

    public void setPayList(List<Pay> payList) {
        this.payList = payList;
    }

    public List<GiftOption> getGiftOptionList() {
        return giftOptionList;
    }

    public void setGiftOptionList(List<GiftOption> giftOption) {
        this.giftOptionList = giftOption;
    }

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

    public String getGiftImgUrl() {
        return giftImgUrl;
    }

    public void setGiftImgUrl(String giftImgUrl) {
        this.giftImgUrl = giftImgUrl;
    }

    public String getGiftUrl() {
        return giftUrl;
    }

    public String getGiftname() {
        return giftname;
    }

    public void setGiftname(String giftname) {
        this.giftname = giftname;
    }

    public void setGiftUrl(String giftUrl) {
        this.giftUrl = giftUrl;
    }

    public Gift toEntity(ProductRepository productRepository) throws IOException {
        Gift gift = new Gift();
        gift.setGiftUrl(this.giftUrl);
        // 선물 링크로 담고, 프로덕트 정보가 없다면
        if (this.giftUrl.length() > 0) {
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url(this.giftUrl)
                    .build();
            Response response = client.newCall(request).execute();

            String html = response.body().string();
            // Parse HTML using Jsoup
            Document doc = Jsoup.parse(html);
            String price = "";
            String imgUrl = doc.head().getElementsByAttributeValue("property","og:image").attr("content");
            try {
                price = doc.getElementsByClass("origin-price").first().text().replaceAll("[^\\d]", "");
            } catch (Exception e) {
                price = doc.getElementsByClass("total-price").first().text().replaceAll("[^\\d]", "");
            }
            String productName = doc.getElementsByClass("prod-buy-header__title").first().text();

            gift.setGiftImgUrl(imgUrl);
            gift.setGiftname(productName);
            gift.setPurePrice(Integer.parseInt(price));
        }
        else {
            gift.setGiftImgUrl(this.giftImgUrl);
            gift.setGiftname(this.giftname);
            gift.setPurePrice(this.purePrice*this.quantity);
        }
        gift.setProductId(this.productId);
        gift.setQuantity(this.quantity);
        gift.setUserOption(this.userOption);
        gift.setType(this.type);
        gift.setFinishYN(this.finishYN);
        gift.setMaxAmount(this.maxAmount);
        gift.setGathered(this.gathered);
        gift.setSuccessYN(this.successYN);
        gift.setIdx(this.idx);
        gift.setPayList(this.payList);
        return gift;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
