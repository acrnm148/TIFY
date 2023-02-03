package com.tify.back.controller.gifthub;

import com.tify.back.dto.gifthub.GiftDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.wish.Wish;
import com.tify.back.service.gifthub.GiftService;
import com.tify.back.service.gifthub.OrderService;
import com.tify.back.service.gifthub.ProductService;
import com.tify.back.service.wish.WishService;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gift")
public class GiftController {
    private final GiftService giftService;
    private final OrderService orderService;
    private final WishService wishService;
    private final ProductService productService;

    @GetMapping("/detail/{id}")
    public Map<String,Object> getGift(@PathVariable Long id) {
        return giftService.getGiftInfoById(id);
    }

//    @PostMapping
//    public GiftDto makeGift(@RequestBody GiftDto giftDto) throws JSONException {
//        return giftService.createGift(giftDto);
//    }

    @DeleteMapping("/detail/{id}")
    public String deleteGift(@PathVariable Long id) {
        return giftService.deleteGift(id);
    }

    @PutMapping("/detail/{id}")
    public Gift updateGift(@PathVariable Long id, @RequestBody Gift gift) {
        Gift existingGift = giftService.getGiftById(id);
        existingGift.setGiftUrl(gift.getGiftUrl());
        existingGift.setGiftImgUrl(gift.getGiftImgUrl());
        existingGift.setUserOption(gift.getUserOption());
        existingGift.setIdx(gift.getIdx());
        existingGift.setFinishYN(gift.getFinishYN());
        existingGift.setGathered(gift.getGathered());
        existingGift.setQuantity(gift.getQuantity());
        existingGift.setFinishYN(gift.getFinishYN());
        existingGift.setMaxAmount(gift.getMaxAmount());
        existingGift.setSuccessYN(gift.getSuccessYN());
        existingGift.setPurePrice(gift.getPurePrice());
        existingGift.setType(gift.getType());
        // wish, product는 생성시, order는 order 생성시.
        return giftService.updateGift(existingGift);
    }

}
