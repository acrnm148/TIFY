package com.tify.back.service.pay;

import com.tify.back.dto.pay.request.PayRequestDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.pay.Pay;
import com.tify.back.repository.gifthub.GiftRepository;
import com.tify.back.repository.pay.PayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PayService {

    private final PayRepository payRepository;
    private final GiftRepository giftRepository;

    /**
     * 축하카드 저장 + 결제
     */
    @Transactional
    public Pay fund(PayRequestDto payRequestDto) {
        System.out.println("입력받은 축하 내용"+ payRequestDto);

        Gift gift = giftRepository.findById(payRequestDto.getGiftId()).get();

        //여기서 결제
        //iamportService.

        Pay pay = payRepository.save(
                Pay.builder()
                        .gift(gift)
                        .amount(payRequestDto.getAmount())
                        .celeb_from(payRequestDto.getCelebFrom())
                        .celeb_content(payRequestDto.getCelebContent())
                        .celeb_tel(payRequestDto.getCelebTel())
                        .celeb_img_url(payRequestDto.getCelebImgUrl())
                        .createTime(LocalDateTime.now())
                        .build()
        );
        gift.setGathered(gift.getGathered()+Integer.parseInt(pay.getAmount())); //모인 펀딩 금액에 추가
        
        // 펀딩금액 초과 시 기프트 상태 변경
        if(validateGathered(gift));

        return pay;
    }

    /**
     * 펀딩 금액 모으기
     */
    @Transactional
    public boolean validateGathered(Gift gift) {
        if (gift.getGathered() >= gift.getMaxAmount()) {
            gift.setFinishYN("Y");
            gift.setSuccessYN("Y");
            return true;
        }
        else return false;
    }
}
