package com.tify.back.service.wish;

import com.tify.back.dto.gifthub.GiftDto;
import com.tify.back.dto.wish.AddWishDto;
import com.tify.back.dto.wish.CelebCardDto;
import com.tify.back.dto.wish.JoinedWishDto;
import com.tify.back.dto.wish.MyCelebDto;
import com.tify.back.model.friend.Friend;
import com.tify.back.model.friend.FriendStatus;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.pay.Pay;
import com.tify.back.model.wish.JoinedWish;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.gifthub.ProductRepository;
import com.tify.back.repository.pay.PayCustomRepository;
import com.tify.back.repository.pay.PayRepository;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.repository.wish.JoinedWishRepository;
import com.tify.back.repository.wish.WishRepository;

import com.tify.back.service.gifthub.GiftService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class WishService {
    private final WishRepository wishRepository;
    private final PayRepository payRepository;
    private final PayCustomRepository payCustomRepository;
    private final JoinedWishRepository joinedWishRepository;
    private final GiftService giftService;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // 위시 데이터 저장 서비스
    public Wish pureSave(Wish wish) {
        return wishRepository.save(wish);
    }

    public Wish findWishById(Long id) {
        return wishRepository.findById(id).orElse(null);
    }

    // gift datas come in shape of JsonArray
    public boolean saveWish(AddWishDto dto) throws IOException {
        Wish wish = dto.toEntity(userRepository);
        wish.setNowPrice(0);
        wishRepository.save(wish);
        List<Gift> gifts = wish.getGiftItems();
        for (GiftDto giftDto : dto.getGiftItems()) {
            Gift gift = giftDto.toEntity(productRepository);
            gift.setWish(wish);
            gift.setSuccessYN("N");
            gift.setFinishYN("N");
            gift = giftService.createGift(gift, wish.getId());
            gifts.add(gift);
        }
        wish.setJoinCount(0);
        wish.setGiftItems(gifts);
        try {
            wishRepository.save(wish);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public List<Wish> getWish(long userId) {
        return wishRepository.findByUserId(userId);
    }

    public Wish wishDetailId(Long wishId) {
        if (wishRepository.findById(wishId).isPresent()) {
            return wishRepository.findById(wishId).get();
        } else {
            return null;
        }

    }

    public String deleteWishById(Long id) {
        Wish wish = wishRepository.findById(id).orElse(null);
        List<Gift> gifts = wish.getGiftItems();
        for (Gift gift : gifts) {
            giftService.deleteGift(gift.getId());
        }
        wishRepository.delete(wish);
        return wish.getUser().getEmail() + "의 wish" + wish.getId() + " 번 위시 " + "successfully deleted";
    }

    @Scheduled(cron = "0 0 0 * * *") // run every day at midnight
    public void updateWishFinishYN() {
        List<Wish> wishes = wishRepository.findAll();
        for (Wish wish : wishes) {
            if (wish.getEndDate().before(new Date()) && !wish.getFinishYN().equals("Y")) {
                wish.setFinishYN("Y");
                wishRepository.save(wish);
            }
        }
    }

    /**
     * 내가 참여한 위시 리스트
     */
    public List<JoinedWishDto> getParticipatedWish(Long userId) {
        List<JoinedWish> joinedWishList = joinedWishRepository.findAllByUserIdOrderByWishId(userId);
        List<JoinedWishDto> list = new ArrayList<> ();
        Long lastWishId = -1L;
        System.out.println("참여한 위시들:"+joinedWishList);

        for (JoinedWish item : joinedWishList) {
            System.out.println("이전 위시:["+lastWishId+"] 지금 위시:["+item.getWishId()+"]");
            if (Objects.equals(lastWishId, item.getWishId())) {
                continue;
            }
            lastWishId = item.getWishId();

            System.out.println("참여한 위시:"+item);
            if (!payRepository.findById(item.getPayId()).isPresent()) {
                System.out.println("pay가 없습니다.");
                return null;
            }
            Pay pay = payRepository.findById(item.getPayId()).get();
            Gift gift = pay.getGift();
            Wish wish = wishRepository.findById(item.getWishId()).get();
            List<CelebCardDto> celebCardDtoList = new ArrayList<> ();
            List<MyCelebDto> myCelebDtoList = new ArrayList<> ();

            //List<Pay> payListByGiftIdAndUserId = payCustomRepository.findMyPayListByGiftId(gift, userId);
            List<Pay> payListByWishIdAndUserId = payCustomRepository.findMyPayListByWishId(wish.getId(), userId);
            for (Pay payItem : payListByWishIdAndUserId) {
                System.out.println("payList들:"+payItem);
                CelebCardDto celebCardDto = CelebCardDto.builder()
                        .payId(payItem.getPay_id())
                        .celebFrom(payItem.getCeleb_from())
                        .celebContent(payItem.getCeleb_content())
                        .celebContent(payItem.getCeleb_content())
                        .build();
                String year = String.valueOf(payItem.getCreateTime().getYear());
                String month = String.valueOf(payItem.getCreateTime().getMonthValue());
                String day = String.valueOf(payItem.getCreateTime().getDayOfMonth());
                System.out.println( year+"."+month+"."+day );
                MyCelebDto myCelebDto = MyCelebDto.builder()
                        .giftId(gift.getId())
                        .giftImgUrl(gift.getGiftImgUrl())
                        .giftName(gift.getGiftname())
                        .amount(payItem.getAmount())
                        .payedDate( year+"."+month+"."+day )
                        .build();

                celebCardDtoList.add(celebCardDto);
                myCelebDtoList.add(myCelebDto);
            }

            JoinedWishDto joinedWishDto = JoinedWishDto.builder()
                    .joinedWishId(item.getId())
                    .wishId(item.getWishId())
                    .userId(item.getUserId())
                    //.pay(pay)
                    .wishCategory(wish.getCategory())
                    .wishName(wish.getTitle())
                    .wishUser(wish.getUser().getUserid())
                    .wishUserId(wish.getUser().getId())
                    .wishFinishYN(wish.getFinishYN())
                    .wishEndDate(wish.getEndDate())
                    .celebCardDtoList(celebCardDtoList)
                    .myCelebDtoList(myCelebDtoList)
                    .build();
            list.add(joinedWishDto);
        }
        return list;
    }
}

