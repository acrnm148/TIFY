package com.tify.back.controller.pay;

import com.tify.back.auth.jwt.service.JwtService;
import com.tify.back.dto.pay.request.PayRequestDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.pay.Pay;
import com.tify.back.repository.gifthub.GiftRepository;
import com.tify.back.service.pay.PayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Tag(name = "pay", description = "축하 API")
@RequiredArgsConstructor //생성자로 DI
@RestController
@RequestMapping("/api")
public class PayController {

    private final JwtService jwtService;
    private final PayService payService;
    private final GiftRepository giftRepository;

    @Operation(summary = "celebrate", description = "축하하기")
    @GetMapping("/celebrate")
    public ResponseEntity<?> celebrate(@RequestBody PayRequestDto payRequestDto) { //json으로 전달이 안됨
        System.out.println("축하하기 메소드 진입");

        Optional<Gift> gift = giftRepository.findById(payRequestDto.getGiftId());
        if (gift.isPresent() == false) {
            return ResponseEntity.ok().body("상품이 없습니다.");
        }
        System.out.println(gift.get());
        if (gift.get().getFinishYN().equals("Y") || gift.get().getSuccessYN().equals("Y")) {
            return ResponseEntity.ok().body("펀딩이 완료된 기프트입니다.");
        }

        Pay pay = payService.fund(payRequestDto);
        System.out.println(pay);

        return ResponseEntity.ok().body("축하가 완료되었습니다.");
    }
}
