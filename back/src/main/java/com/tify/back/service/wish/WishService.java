package com.tify.back.service.wish;

import com.tify.back.dto.gifthub.GiftDto;
import com.tify.back.dto.wish.AddWishDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.gifthub.ProductRepository;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.repository.wish.WishRepository;

import com.tify.back.service.gifthub.GiftService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class WishService {
    private final WishRepository wishRepository;
    private final GiftService giftService;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // 위시 데이터 저장 서비스
    public Wish pureSave(Wish wish) {
        return wishRepository.save(wish);
    }
    public Wish findWishById(Long id) {
        return wishRepository.findById(id).orElse(null);
    }

    // gift datas come in shape of JsonArray
    public boolean saveWish(AddWishDto dto) {
<<<<<<< HEAD
        Wish wishEntity = new Wish();
        wishEntity.setGiftItems(dto.getGiftItem());
//        try {
//            List<Gift> giftItems = objectMapper.readValue((JsonParser) dto.getGiftItem(), new TypeReference<List<Gift>>(){});
//            wishEntity.setGiftItems(giftItems);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        wishEntity.setTotPrice(dto.getTotalPrice());
        wishEntity.setNowPrice(dto.getNowPrice());
        wishEntity.setTitle(dto.getWishTitle());
        wishEntity.setContent(dto.getWishContent());
        wishEntity.setCategory(dto.getCategory());
        wishEntity.setFinishYN(dto.getFinishYN());
        wishEntity.setStartDate(dto.getStartDate());
        wishEntity.setEndDate(dto.getEndDate());
        wishEntity.setCardImageCode(dto.getWishCard());
        wishEntity.setAddr1(dto.getAddr1());
        wishEntity.setAddr2(dto.getAddr2());
        wishEntity.setZipCode(dto.getZipCode());

=======
        Wish wish = dto.toEntity(userRepository);
        wishRepository.save(wish);
        List<Gift> gifts = wish.getGiftItems();
        for(GiftDto giftDto: dto.getGiftItems()){
            Gift gift = giftDto.toEntity(productRepository);
            gift.setWish(wish);
            gift = giftService.createGift(gift,wish.getId());
            gifts.add(gift);
        }
        wish.setJoinCount(0);
//        wishEntity.setTotPrice(dto.getTotalPrice());
//        wishEntity.setNowPrice(dto.getNowPrice());
//        wishEntity.setTitle(dto.getWishTitle());
//        wishEntity.setContent(dto.getWishContent());
//        wishEntity.setCategory(dto.getCategory());
//        wishEntity.setFinishYN(dto.getFinishYN());
//        wishEntity.setStartDate(dto.getStartDate());
//        wishEntity.setEndDate(dto.getEndDate());
//        wishEntity.setCardImageCode(dto.getWishCard());
//        wishEntity.setAddr1(dto.getAddr1());
//        wishEntity.setAddr2(dto.getAddr2());
//        wishEntity.setZipCode(dto.getZipCode());
>>>>>>> 39cd1f184e1b678475d4c8c208b276242aede21c
        // 실제 데이터베이스에 데이터저장
        wish.setGiftItems(gifts);
        try {
            wishRepository.save(wish);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
    public Wish wishDetailId(Long wishId){
        if(wishRepository.findById(wishId).isPresent()){
            return wishRepository.findById(wishId).get();
        }else{
            return null;
        }

    }

}

