package com.tify.back.wish.controller;
import com.tify.back.gifthub.entity.Wish;
import com.tify.back.wish.dto.AddWishDto;
import com.tify.back.wish.service.Wish2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wish2")
public class Wish2Controller {
    private final Wish2Service wish2Service;
    @PostMapping("/add")
    public Integer addWish(@RequestBody AddWishDto dto){
        System.out.println("add controller");
        System.out.println("request data => " + dto.getWishTitle());
        System.out.println("request data => " + dto.getWishContent());
        System.out.println("request data => " + dto.getCategory());

        //유효성 검사
        if(dto.getWishTitle().equals(""))
        {
            // 타이틀이 입력되지않았을때
            return 3;
        }

        boolean result = wish2Service.saveWish(dto);

        if(result)
        {
            return 0;
        }else {
            return 1;
        }
    }
    @GetMapping("/detail")
    public Wish wishList(@RequestParam(value = "wishId", required = true) Long wishId){
        return wish2Service.wishDetailId(wishId);
    }

}