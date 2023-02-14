package com.tify.back.controller.wish;
import com.tify.back.dto.wish.AddWishDto;
import com.tify.back.model.friend.Friend;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.wish.WishRepository;
import com.tify.back.service.wish.WishService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wish")
public class WishController {
    private final WishService wishService;
    private final WishRepository wishRepository;
    @PostMapping("/add")
    public String addWish(@RequestBody AddWishDto dto) throws IOException {

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

    @PutMapping("/cardopen/{wishId}")
    public String cardOpen(@PathVariable Long wishId) {
        Wish wish = wishRepository.findById(wishId).orElse(null);
        if (wish == null) {
            return "wish not found";
        }
        wish.setCardopen("open");
        wishRepository.save(wish);
        return "card open";
    }

    @GetMapping("/wish/{userId}")
    public List<Wish> getWish(@PathVariable long userId) {
        List<Wish> wish = wishService.getWish(userId);
        return wish;
    }
    @GetMapping
    public List<Wish> Wish() {
        return wishRepository.findAll();
    }

    @PutMapping("/edit")
    public String editWish(@RequestBody AddWishDto dto) {
        // Validate if the wish exists
        Optional<Wish> wishOptional = wishRepository.findById(dto.getWishId());
        if (!wishOptional.isPresent()) {
            return "Wish not found!";
        }
        Wish wish = wishOptional.get();

        // Update the wish with the new values
        wish.setTotPrice(dto.getTotalPrice());
        wish.setNowPrice(dto.getNowPrice());
        wish.setTitle(dto.getWishTitle());
        wish.setContent(dto.getWishContent());
        wish.setCategory(dto.getCategory());
        wish.setFinishYN(dto.getFinishYN());
        wish.setStartDate(dto.getStartDate());
        wish.setEndDate(dto.getEndDate());
        wish.setCardImageCode(dto.getWishCard());
        wish.setAddr1(dto.getAddr1());
        wish.setAddr2(dto.getAddr2());
        wish.setZipCode(dto.getZipCode());

        // Save the changes to the database
        wishRepository.save(wish);
        return "Wish updated!";
    }

    @PostMapping// test용 빈 wish 만드는 컨트롤러
    public Wish makeWish(String message) {
        Wish wish = new Wish();
        return wishService.pureSave(wish);
    }
}
