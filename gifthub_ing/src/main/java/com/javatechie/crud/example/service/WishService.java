package com.javatechie.crud.example.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.javatechie.crud.example.entity.*;
import com.javatechie.crud.example.repository.WishRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishService {
    private final WishRepository wishRepository;
    private final ProductService productService;
    private final GiftService giftItemService;
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

    public Wish getWishById(int id) {
        return wishRepository.findById(id).orElse(null);
    }
    public String deleteWish(int id) {
        wishRepository.deleteById(id);
        return "wish removed !!" + id;
    }

    public Wish addGift(String message) throws Exception {
//        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String,String>>() {};
//        Map<String, String> map = objectMapper.readValue(message, typeReference);
        JSONObject map = new JSONObject(message);
        Wish wish =  getWishById(Integer.parseInt(map.getString("wishId")));
        Product product = productService.getProductById(Integer.parseInt(map.getString("productId")));
        Gift gift = giftItemService.createGift(product, wish, Integer.parseInt(map.getString("quantity")), map.getString("options"));
        Integer price = (int) (gift.getPurePrice()*1.03/10*10);

        List<Gift> giftItems = wish.getGiftItems();
        giftItems.add(gift);
        wish.setTotPrice(wish.getTotPrice() + price);
        wish.setGiftItems(giftItems);
        return saveWish(wish);
    }
}
