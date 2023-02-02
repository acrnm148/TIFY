package com.tify.back.controller.pay;

import com.tify.back.auth.jwt.service.JwtService;
import com.tify.back.dto.pay.request.PayRequestDto;
import com.tify.back.exception.NoGiftException;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.Order;
import com.tify.back.model.pay.Pay;
import com.tify.back.model.users.User;
import com.tify.back.repository.gifthub.GiftRepository;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.service.pay.PayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Tag(name = "pay", description = "축하 API")
@RequiredArgsConstructor //생성자로 DI
@RestController
@RequestMapping("/api")
public class PayController {

    private final JwtService jwtService;
    private final PayService payService;
    private final GiftRepository giftRepository;
    private final UserRepository userRepository;

    @Operation(summary = "celebrate", description = "축하하기")
    @PostMapping("/celebrate")
    public ResponseEntity<?> celebrate(@RequestBody PayRequestDto payRequestDto) { //json으로 전달이 안됨
        System.out.println("축하하기 메소드 진입");

        if (payRequestDto.getGiftId() == null) {
            throw new NoGiftException("상품이 존재하지 않습니다.");
        }
        Optional<Gift> gift = giftRepository.findById(payRequestDto.getGiftId());
        if (gift.isPresent() == false) {
            return ResponseEntity.ok().body("상품이 없습니다.");
        }
        System.out.println(gift.get());
        if (gift.get().getFinishYN().equals("Y") || gift.get().getSuccessYN().equals("Y")) {
            return ResponseEntity.ok().body("펀딩이 완료된 기프트입니다.");
        }

        Pay pay = payService.fund(payRequestDto);
        User user = userRepository.findById(payRequestDto.getUserId()).get();
        System.out.println("결제 완료 : "+pay);

        return ResponseEntity.ok().body("축하가 완료되었습니다.");
    }
}
