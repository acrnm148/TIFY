package com.tify.back.gifthub.service;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.tify.back.gifthub.entity.Gift;
import com.tify.back.gifthub.entity.Product;
import com.tify.back.gifthub.entity.Wish;
import com.tify.back.gifthub.repository.WishRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishService {
    private final WishRepository wishRepository;
    private final ProductService productService;
    private final GiftService giftService;
    ObjectMapper objectMapper = new ObjectMapper();

    public Wish saveWish(Wish wish) {
        return wishRepository.save(wish);
    }

//    public List<Cart> saveCarts(List<Cart> carts) {
//        return cartRepository.saveAll(carts);
//    }
//
//    public List<Cart> getCarts() {
//        return cartRepository.findAll();
//    }

    public Wish getWishById(Long id) {
        return wishRepository.findById(id).orElse(null);
    }
    public String deleteWish(Long id) {
        wishRepository.deleteById(id);
        return "wish removed !!" + id;
    }

    public Wish addGift(String message) throws Exception {
//        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String,String>>() {};
//        Map<String, String> map = objectMapper.readValue(message, typeReference);
        JSONObject map = new JSONObject(message);
        Wish wish =  getWishById(map.getLong("wishId"));
        Product product = productService.getProductById(map.getLong("productId"));
        Gift gift = giftService.createGift(product, wish, map.getInt("quantity"), map.getString("options"));
        Integer price = (int) (gift.getPurePrice()*1.03/10*10);
        List<Gift> giftItems = wish.getGiftItems();
        giftItems.add(gift);
        wish.setTotPrice(wish.getTotPrice() + price);
        wish.setGiftItems(giftItems);
        return saveWish(wish);
    }
}
