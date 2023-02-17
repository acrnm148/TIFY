package com.tify.back.controller.gifthub;

import com.tify.back.dto.gifthub.GiftDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.Product;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.gifthub.GiftRepository;
import com.tify.back.service.gifthub.GiftService;
import com.tify.back.service.gifthub.OrderService;
import com.tify.back.service.gifthub.ProductService;
import com.tify.back.service.wish.WishService;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final GiftRepository giftRepository;
    @GetMapping("/detail/{id}")
    public Map<String,Object> getGift(@PathVariable Long id) {
        return giftService.getGiftInfoById(id);
    }

    @GetMapping("/admin/{id}")
    public GiftDto adminGetGift(@PathVariable Long id) {
        Gift gift = giftService.getGiftById(id);
        GiftDto dto = new GiftDto();
        dto.setGiftUrl(gift.getGiftUrl());
        dto.setGiftImgUrl(gift.getGiftImgUrl());
        dto.setProductId(gift.getProductId());
        dto.setGiftname(gift.getGiftname());
        dto.setQuantity(gift.getQuantity());
        dto.setUserOption(gift.getUserOption());
        dto.setType(gift.getType());
        dto.setFinishYN(gift.getFinishYN());
        dto.setMaxAmount(gift.getMaxAmount());
        dto.setPurePrice(gift.getPurePrice());
        dto.setGathered(gift.getGathered());
        dto.setSuccessYN(gift.getSuccessYN());
        dto.setIdx(gift.getIdx());
        dto.setPayList(gift.getPayList());
        dto.setId(gift.getId());
        return dto;
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
        existingGift.setGiftname(gift.getGiftname());
        existingGift.setType(gift.getType());
        // wish, product는 생성시, order는 order 생성시.
        return giftService.updateGift(existingGift);
    }

    @GetMapping
    public Page<Gift> getGifts(@RequestParam(value = "page", required = false) Integer page,
                                     @RequestParam(value = "max_result", required = false) Integer max_result) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return giftRepository.findAll(pageable);
    }

    @GetMapping("/{wish_id}")
    public Page<Gift> getGifts(@RequestParam(value = "page", required = false) Integer page,
                                  @RequestParam(value = "max_result", required = false) Integer max_result,
                                  @PathVariable Long wish_id) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return giftRepository.findByWish(pageable, wishService.findWishById(wish_id));
    }
}
