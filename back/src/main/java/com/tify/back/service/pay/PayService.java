package com.tify.back.service.pay;

import com.tify.back.dto.pay.request.PayRequestDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.pay.Pay;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.gifthub.GiftRepository;
import com.tify.back.repository.pay.PayRepository;
import com.tify.back.repository.wish.WishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class PayService {

    private final PayRepository payRepository;
    private final GiftRepository giftRepository;
    private final WishRepository wishRepository;

    /**
     * 축하카드 저장 + 결제
     */
    @Transactional
    public Pay fund(PayRequestDto payRequestDto) {
        System.out.println("입력받은 축하 내용"+ payRequestDto);

        Gift gift = giftRepository.findById(payRequestDto.getGiftId()).get();
        Wish wish = gift.getWish();

        System.out.println("wish:"+wish);

        Pay pay = payRepository.save(
                Pay.builder()
                        .gift(gift)
                        .amount(payRequestDto.getAmount())
                        .celeb_from(payRequestDto.getCelebFrom())
                        .celeb_content(payRequestDto.getCelebContent())
                        .celeb_tel(payRequestDto.getCelebTel())
                        .celeb_img_url(payRequestDto.getCelebImgUrl())
                        .createTime(LocalDateTime.now())
                        .user_id(payRequestDto.getUserId())
                        .build()
        );
        gift.setGathered(gift.getGathered()+Integer.parseInt(pay.getAmount())); //모인 펀딩 금액에 추가
        wish.setNowPrice(wish.getNowPrice()+Integer.parseInt(pay.getAmount()));

        // 펀딩금액 초과 시 기프트 상태 변경
        if(validateGathered(gift));

        return pay;
    }
    /**
     * 기프트 펀딩 완료
     */
    @Transactional
    public boolean validateGathered(Gift gift) {
        if (gift.getGathered() >= gift.getMaxAmount()) {
            gift.setFinishYN("Y");
            gift.setSuccessYN("Y");
            gift.setFinishDate(LocalDateTime.now());
            return true;
        }
        else return false;
    }


}
