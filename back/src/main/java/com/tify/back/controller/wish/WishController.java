package com.tify.back.controller.wish;
import com.tify.back.dto.wish.AddWishDto;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.wish.WishRepository;
import com.tify.back.service.wish.WishService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wish")
public class WishController {
    private final WishService wishService;
    private final WishRepository wishRepository;
    @PostMapping("/add")
    public String addWish(@RequestBody AddWishDto dto){

        //유효성 검사
        if(dto.getWishTitle().equals(""))
        {
            // 타이틀이 입력되지않았을때
            return "no title given";
        }

        boolean result = wishService.saveWish(dto);

        if(result)
        {
            return "wish created!";
        }else {
            return "failed to create wish!";
        }
    }
    @GetMapping("/detail")
    public Wish wishList(@RequestParam(value = "wishId", required = true) Long wishId){
        return wishService.wishDetailId(wishId);
    }

    @GetMapping("/detail/user")
    public Wish wisharray(@RequestParam(value = "userId", required = true) Long userId){
        return wishService.wishUserId(userId);
    }
    @GetMapping
    public List<Wish> Wish() {
        return wishRepository.findAll();
    }

    @PostMapping// test용 빈 wish 만드는 컨트롤러
    public Wish makeWish(String message) {
        Wish wish = new Wish();
        return wishService.pureSave(wish);
    }
}