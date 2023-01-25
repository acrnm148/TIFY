package com.tify.back.wish.service;

import com.tify.back.wish.dto.JoinedWishDto;
import com.tify.back.wish.entity.JoinedWish;
import com.tify.back.wish.repository.JoinedWishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JoinedWishService {
    private final JoinedWishRepository joinedWishRepository;

    public boolean saveJoinedWish(JoinedWishDto dto) {
        JoinedWish joinedWishEntity = new JoinedWish();
        joinedWishEntity.setUserId(dto.getUserId());
        joinedWishEntity.setWishId(dto.getWishId());
        joinedWishEntity.setPayId(dto.getPayId());

        // 실제 데이터베이스에 데이터저장
        try {
            joinedWishRepository.save(joinedWishEntity);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
