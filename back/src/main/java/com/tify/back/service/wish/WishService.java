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

    public Wish wishUserId(Long userId){
        if(wishRepository.findById(userId).isPresent()){
            return wishRepository.findById(userId).get();
        }else{
            return null;
        }

    }

    public String deleteWishById(Long id){
        Wish wish = wishRepository.findById(id).orElse(null);
        List<Gift> gifts = wish.getGiftItems();
        for (Gift gift : gifts) {
            giftService.deleteGift(gift.getId());
        }
        wishRepository.delete(wish);
        return wish.getUser().getEmail() + "의 wish" + wish.getId() + " 번 위시 " + "successfully deleted";

    }

}

