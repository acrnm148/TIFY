package com.javatechie.crud.example.controller;


import com.javatechie.crud.example.entity.Wish;
import com.javatechie.crud.example.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class WishController {

    private final ProductService productService;
    private final ImgService imgService;
    private final WishService wishService;
    private final GiftService giftService;

    @PostMapping("/create-empty-wish")
    public Wish empty_wish(@RequestBody Wish wish) throws Exception {
        return wishService.saveWish(wish);
    }

    @PostMapping("/add-to-wish")
    public Wish addToWish(@RequestBody String message) throws Exception {
        return wishService.addGift(message);
    }

    // 장바구니에서 단일 품목으로 wish 생성
    @GetMapping("/cart/{itemId}/makewish")
    public String makeWish(@RequestParam(value = "itemId", required = true) String itemId) throws Exception {
        Wish wish = new Wish();
        return "1";
    }
}
