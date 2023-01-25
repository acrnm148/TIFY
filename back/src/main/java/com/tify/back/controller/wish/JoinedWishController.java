package com.tify.back.controller.wish;

import com.tify.back.dto.wish.JoinedWishDto;
import com.tify.back.model.wish.JoinedWish;
import com.tify.back.repository.wish.JoinedWishRepository;
import com.tify.back.service.wish.JoinedWishService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/join")
public class JoinedWishController {
    private final JoinedWishService joinedWishService;
    private final JoinedWishRepository joinedWishRepository;

    @GetMapping
    public List<JoinedWish> joinedWish() {
        return joinedWishRepository.findAll();
    }
    @PostMapping("/add")
    public Integer joinedWish(@RequestBody JoinedWishDto dto) {
        joinedWishService.saveJoinedWish(dto);
        return 0;
    }
}
