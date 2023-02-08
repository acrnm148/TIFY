package com.tify.back.service.pay;

import com.tify.back.dto.pay.request.PayRequestDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.Order;
import com.tify.back.model.pay.Pay;
import com.tify.back.model.users.User;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.gifthub.GiftRepository;
import com.tify.back.repository.pay.PayRepository;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.repository.wish.WishRepository;
import com.tify.back.service.gifthub.OrderService;
import com.tify.back.service.wish.WishService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class PayService {

    private final OrderService orderService;
    private final PayRepository payRepository;
    private final GiftRepository giftRepository;
    private final WishRepository wishRepository;
    private final UserRepository userRepository;

    /**
     * 축하카드 저장 + 결제
     */
    @Transactional
    public Pay fund(PayRequestDto payRequestDto) {
        System.out.println("입력받은 축하 내용"+ payRequestDto);

        Gift gift = giftRepository.findById(payRequestDto.getGiftId()).get();
        Wish wish = gift.getWish();

        String profImg = null;
        if (payRequestDto.getUserId() != null) {
            User user = userRepository.findById(payRequestDto.getUserId()).get();
            profImg = profImg + user.getProfileImg();
            System.out.println("profImg: ["+profImg+"]");
        }

        System.out.println("wish:"+wish);

        //pay 생성
        Pay pay = payRepository.save(
                Pay.builder()
                        .gift(gift)
                        .amount(payRequestDto.getAmount())
                        .celeb_from(payRequestDto.getCelebFrom())
                        .celeb_content(payRequestDto.getCelebContent())
                        .celeb_tel(payRequestDto.getCelebTel())
                        .celeb_img_url(payRequestDto.getCelebImgUrl())
                        .createTime(LocalDateTime.now())
                        .userId(payRequestDto.getUserId())
                        .profImgUrl(profImg)
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

            //자동 주문
            Wish wish = gift.getWish();
            User user = wish.getUser(); //위시 주인
            Order newOrder = orderService.addNewOrder(gift, user);
            System.out.println("자동 주문 :"+newOrder);

            return true;
        }
        else return false;
    }


}
