package com.tify.back.service.wish;



import com.tify.back.dto.wish.AddWishDto;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.wish.WishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WishService {
    private final WishRepository wishRepository;
    // 위시 데이터 저장 서비스
    public Wish pureSave(Wish wish) {
        return wishRepository.save(wish);
    }
    public Wish findWishById(Long id) {
        return wishRepository.findById(id).orElse(null);
    }

    // gift datas come in shape of JsonArray
    public boolean saveWish(AddWishDto dto) {
        Wish wishEntity = new Wish();
        wishEntity.setGiftItems(dto.getGiftItem());
        try {
            List<Gift> giftItems = objectMapper.readValue((JsonParser) dto.getGiftItem(), new TypeReference<List<Gift>>(){});
            wishEntity.setGiftItems(giftItems);
        } catch (IOException e) {
            e.printStackTrace();
        }
        wishEntity.setTotPrice(dto.getTotalPrice());
        wishEntity.setNowPrice(dto.getNowPrice());
        wishEntity.setTitle(dto.getWishTitle());
        wishEntity.setContent(dto.getWishContent());
        wishEntity.setCategory(dto.getCategory());
        wishEntity.setFinishYN(dto.getFinishYN());
        wishEntity.setStartDate(dto.getStartDate());
        wishEntity.setEndDate(dto.getEndDate());
        wishEntity.setCardImageCode(dto.getWishCard());
        wishEntity.setAddr1(dto.getAddr1());
        wishEntity.setAddr2(dto.getAddr2());
        wishEntity.setZipCode(dto.getZipCode());

        // 실제 데이터베이스에 데이터저장
        try {
            wishRepository.save(wishEntity);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
    public Wish wishDetailId(Long wishId){
        if(wishRepository.findById(wishId).isPresent()){
            return wishRepository.findById(wishId).get();
        }else{
            return null;
        }

    }

}

