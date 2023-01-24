package com.tify.back.wish.controller;

import com.tify.back.wish.dto.JoinedWishDto;
import com.tify.back.wish.entity.JoinedWish;
import com.tify.back.wish.repository.JoinedWishRepository;
import com.tify.back.wish.service.JoinedWishService;
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
