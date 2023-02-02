package com.tify.back.service.users;

import com.tify.back.dto.users.MailDto;
import com.tify.back.repository.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import java.util.Random;

@Service
@EnableAsync
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;

    @Async
    public void send(String email, String authToken) {
        System.out.println("이메일 전송 함수 진입:"+email+" "+authToken);
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setTo(email);//+"@gmail.com"
        smm.setSubject("[TIFY] 회원가입 이메일 인증");
        smm.setText("https://i8e208.p.ssafy.io/api/account/confirmEmail?email="+email+"&authToken="+authToken);

        System.out.println(smm);
        javaMailSender.send(smm);
    }

    /**
     * 메일 내용을 생성하고 임시 비밀번호로 회원 비밀번호를 변경
      */
    public void createMailAndChangePassword(String email, String name) {
        String tempPw = getTempPassword();
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setTo(email);
        smm.setSubject("[TIFY] 고객님의 임시 비밀번호입니다.");
        smm.setText("안녕하세요,"+name+"님! TIFY 임시 비밀번호 안내 관련 이메일 입니다." + " 고객님의 임시 비밀번호는 "
                + tempPw + " 입니다." + "로그인 후에 비밀번호를 변경을 해주세요");
        updatePassword(tempPw,email);
    }

    /**
     * 임시 비밀번호로 업데이트
     */
    public void updatePassword(String tempPw, String userEmail){
        Long memberId = userRepository.findByUserid(userEmail).getId();
        //userService.updatePassword(memberId,tempPw);
    }

    /**
     * 랜덤함수로 임시비밀번호 구문 만들기
     */
    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    /**
     * 비밀번호 변경
     */
    public void updatePassword(Long userId, String password) {
        //userService.updatePassword(userId,password);
    }

}