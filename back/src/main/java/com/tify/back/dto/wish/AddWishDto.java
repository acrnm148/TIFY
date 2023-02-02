package com.tify.back.dto.wish;

import com.tify.back.dto.gifthub.GiftDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.repository.wish.WishRepository;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class AddWishDto {
    private Long userId;
    private List<GiftDto> giftItems;
    private Integer totalPrice;
    private Integer nowPrice;
    private String wishTitle;
    private String wishContent;
    private String category;
    private String finishYN;
    private Date startDate;
    private Date endDate;
    private String wishCard;
    private String addr1;
    private String addr2;
    private String zipCode;

    public Wish toEntity(UserRepository userRepository) {
        Wish wish = new Wish();
        wish.setUser(userRepository.findById(userId).orElse(null));
        wish.setTotPrice(this.totalPrice);
        wish.setNowPrice(this.nowPrice);
        wish.setTitle(this.wishTitle);
        wish.setContent(this.wishContent);
        wish.setCategory(this.category);
        wish.setFinishYN(this.finishYN);
        wish.setStartDate(this.startDate);
        wish.setEndDate(this.endDate);
        wish.setCardImageCode(this.wishCard);
        wish.setAddr1(this.addr1);
        wish.setAddr2(this.addr2);
        wish.setZipCode(this.zipCode);
        return wish;
    }
}
