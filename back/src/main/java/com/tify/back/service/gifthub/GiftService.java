package com.tify.back.service.gifthub;


import com.tify.back.dto.gifthub.GiftDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.Product;
import com.tify.back.repository.gifthub.GiftRepository;

import com.tify.back.model.wish.Wish;
import com.tify.back.repository.wish.WishRepository;
import com.tify.back.service.wish.WishService;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GiftService {
    private final GiftRepository giftRepository;
    private final ProductService productService;
    private final WishRepository wishRepository;
    public Gift saveGift(Gift gift) {
        return giftRepository.save(gift);
    }
    @Transactional
    public Gift createGift(Gift gift, Long wishId) {
        gift.setWish(wishRepository.findById(wishId).orElse(null));
        return giftRepository.save(gift);
//        Gift gift = new Gift();
//        JSONObject map = new JSONObject(message);
//        Wish parentWish = wishService.findWishById(map.getLong("wishId"));
//        List<Gift> gifts = parentWish.getGiftItems();
//
//        gift.setProduct(productService.getProductById(map.getLong("productId")));
//        gift.setWish(parentWish);
//        gift.setQuantity(map.getInt("quantity"));
//        gift.setUserOption(map.getString("userOption"));
//        gift.setType(map.getString("type"));
//        gift.setFinishYN(map.getString("finishYN"));
//        gift.setMaxAmount(map.getInt("maxAmount"));
//        gift.setPurePrice(map.getInt("purePrice"));
//        gift.setSuccessYN(map.getString("successYN"));
//        gift.setIdx(map.getInt("idx"));
//        giftRepository.save(gift);
//
//        gifts.add(gift); // wish의 list에 gift 추가
//        wishService.pureSave(parentWish); // wish 저장.
//        return giftRepository.save(gift);
    }


//    public List<Cart> saveCarts(List<Cart> carts) {
//        return cartRepository.saveAll(carts);
//    }
//
//    public List<Cart> getCarts() {
//        return cartRepository.findAll();
//    }

    //Long.valueOf(Optional.ofNullable(id).orElse(0L)
    public Gift getGiftById(Long id) {
        return giftRepository.findById(id).orElse(null);
    }
    public String deleteGift(Long id) {
        giftRepository.deleteById(id);
        return "gift removed !!" + id;
    }
    public Gift updateGift(Gift gift) {
        return giftRepository.save(gift);
    }
}
