package com.tify.back.controller.wish;
import com.tify.back.dto.noti.FromFrontRequestDTO;
import com.tify.back.dto.noti.MessageDTO;
import com.tify.back.dto.noti.SmsResponseDTO;
import com.tify.back.dto.wish.AddWishDto;
import com.tify.back.model.phonebook.Phonebook;
import com.tify.back.model.users.User;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.repository.wish.WishRepository;
import com.tify.back.service.noti.SmsService;
import com.tify.back.service.phonebook.PhonebookService;
import com.tify.back.service.wish.WishService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wish")
public class WishController {
    private final WishService wishService;
    private final WishRepository wishRepository;
    private final SmsService smsService;
    private final PhonebookService phonebookService;
    private final UserRepository userRepository;
    @PostMapping("/add")
    public String addWish(@RequestBody AddWishDto dto) throws IOException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException {

        //유효성 검사
        if(dto.getWishTitle().equals(""))
        {
            // 타이틀이 입력되지않았을때
            return "no title given";
        }

        boolean result = wishService.saveWish(dto);

        if(result)
        {
            User user = userRepository.findById(dto.getUserId()).orElse(null);
            FromFrontRequestDTO messageDto = new FromFrontRequestDTO();
            List<MessageDTO> messages = new ArrayList<>();
            List<Phonebook> tels = phonebookService.getPhonebookByMyId(dto.getUserId());
            if (tels.size() == 0) return "wish created!";
            for (Phonebook tel : tels) {
                MessageDTO mtemp = new MessageDTO();
                String telNo = tel.getPhoneNumber().replaceAll("-","");
                mtemp.setTo(telNo);
                String content = user.getUsername() + "님의 "+dto.getCategory()+"\n을 축하해주세요! ♪\n"
                +"<"+dto.getWishTitle()+">"+"\n위시에 마음을 전해보세요.★\n"
                +dto.getEndDate()+"일 까지 아래 링크를 통해 선물을 보낼 수 있습니다♥ \n"
                +"https://i8e208.p.ssafy.io/congrats/"+dto.getWishId()+"\n"
                +"본 문자는 TIFY티피의 "+user.getUsername()+"님의\n주소록에 저장된 "+tel.getName()+"님에게 발송되었습니다."
                +"\n∞당신을 위한 축하 TIFY∞";

                mtemp.setContent(content);
                mtemp.setSubject("");
                messages.add(mtemp);
            }

            messageDto.setMessageList(messages);
            SmsResponseDTO response = smsService.sendSms(messageDto);


            return "wish created!";
        }else {
            return "failed to create wish!";
        }
    }
    @GetMapping("/detail")
    public Wish wishList(@RequestParam(value = "wishId", required = true) Long wishId){
        return wishService.wishDetailId(wishId);
    }

    @PutMapping("/cardopen/{wishId}")
    public String cardOpen(@PathVariable Long wishId) {
        Wish wish = wishRepository.findById(wishId).orElse(null);
        if (wish == null) {
            return "wish not found";
        }
        wish.setCardopen("open");
        wishRepository.save(wish);
        return "card open";
    }

    @GetMapping("/wish/{userId}")
    public List<Wish> getWish(@PathVariable long userId) {
        List<Wish> wish = wishService.getWish(userId);
        return wish;
    }
    @GetMapping
    public List<Wish> Wish() {
        return wishRepository.findAll();
    }

    @PutMapping("/edit")
    public String editWish(@RequestBody AddWishDto dto) {
        // Validate if the wish exists
        Optional<Wish> wishOptional = wishRepository.findById(dto.getWishId());
        if (!wishOptional.isPresent()) {
            return "Wish not found!";
        }
        Wish wish = wishOptional.get();

        // Update the wish with the new values
        wish.setTotPrice(dto.getTotalPrice());
        wish.setNowPrice(dto.getNowPrice());
        wish.setTitle(dto.getWishTitle());
        wish.setContent(dto.getWishContent());
        wish.setCategory(dto.getCategory());
        wish.setFinishYN(dto.getFinishYN());
        wish.setStartDate(dto.getStartDate());
        wish.setEndDate(dto.getEndDate());
        wish.setCardImageCode(dto.getWishCard());
        wish.setAddr1(dto.getAddr1());
        wish.setAddr2(dto.getAddr2());
        wish.setZipCode(dto.getZipCode());

        // Save the changes to the database
        wishRepository.save(wish);
        return "Wish updated!";
    }

    @PostMapping// test용 빈 wish 만드는 컨트롤러
    public Wish makeWish(String message) {
        Wish wish = new Wish();
        return wishService.pureSave(wish);
    }
}
