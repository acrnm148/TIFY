package com.tify.back.gifthub.controller;



import com.tify.back.gifthub.entity.Wish;
import com.tify.back.gifthub.service.GiftService;
import com.tify.back.gifthub.service.ImgService;
import com.tify.back.gifthub.service.ProductService;
import com.tify.back.gifthub.service.WishService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wish")
public class WishController {

    private final ProductService productService;
    private final ImgService imgService;
    private final WishService wishService;
    private final GiftService giftService;

    @PostMapping
    public Wish empty_wish(@RequestBody Wish wish) throws Exception {
        return wishService.saveWish(wish);
    }

    @PostMapping("/add")
    public Wish addToWish(@RequestBody String message) throws Exception {
        return wishService.addGift(message);
    }

    // 장바구니에서 단일 품목으로 wish 생성
    @GetMapping("/cart/{itemId}/makewish")
    public String makeWish(@RequestParam(value = "itemId", required = true) String itemId) throws Exception {
        Wish wish = new Wish();
        return "1";
    }

    @PostMapping("/test")
    public String test(@RequestBody String message) throws Exception {
        JSONObject map = new JSONObject(message);
        JSONArray arr = map.getJSONArray("options");
        JSONObject item = (JSONObject) arr.get(0);
        JSONArray arr2 = item.getJSONArray("details");
        JSONObject item2 = (JSONObject) arr2.get(0);
        System.out.println(item2.getString("content"));
        return map.getString("imgs");
    }
}
