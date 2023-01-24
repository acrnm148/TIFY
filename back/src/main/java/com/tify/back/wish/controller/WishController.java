package com.tify.back.wish.controller;
import com.tify.back.wish.dto.AddWishDto;
import com.tify.back.wish.entity.Wish;
import com.tify.back.wish.repository.WishRepository;
import com.tify.back.wish.service.WishService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wish")
public class WishController {
    private final WishService wishService;
    private final WishRepository wishRepository;
    @PostMapping("/add")
    public Integer addWish(@RequestBody AddWishDto dto){

        //유효성 검사
        if(dto.getWishTitle().equals(""))
        {
            // 타이틀이 입력되지않았을때
            return 3;
        }

        boolean result = wishService.saveWish(dto);

        if(result)
        {
            return 0;
        }else {
            return 1;
        }
    }
    @GetMapping("/detail")
    public Wish wishList(@RequestParam(value = "wishId", required = true) Long wishId){
        return wishService.wishDetailId(wishId);
    }
    @GetMapping
    public List<Wish> Wish() {
        return wishRepository.findAll();
    }

}