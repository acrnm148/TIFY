package com.tify.back.service.users;

import com.tify.back.dto.users.MailDto;
import com.tify.back.repository.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
@EnableAsync
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;

    @Async
    public void send(String email, String authToken) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            String htmlStr = "<h2> 회원가입 이메일 인증</h2>"
                    + "아래 버튼을 클릭해서 회원가입을 진행해주세요.<br>"
                    + "<a href='https://i8e208.p.ssafy.io/api/account/confirmEmail?email="+email+"&authToken="+authToken+"' > 인증하기 </a>";

            helper.setSubject("[TIFY] 회원가입 이메일 인증"); //title
            helper.setText(htmlStr, true);
            helper.setTo(new InternetAddress(email, email, "utf-8"));
            javaMailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    /**
     * 메일 내용을 생성
     */
    public String sendPwMail(String email, String name) {
        String tempPw = getTempPassword();
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

            helper.setSubject("[TIFY] 고객님의 임시 비밀번호입니다. ");
            String htmlStr = "<h2> 임시 비밀번호 발급 안내 </h2>"
                    + "안녕하세요,"+name+"님!<br> TIFY 임시 비밀번호 안내 관련 이메일입니다.<br> 고객님의 임시 비밀번호는 [<strong>"
                    + tempPw + "</strong>] 입니다. 로그인 후 비밀번호를 변경해주세요.";

            helper.setText(htmlStr, true);
            helper.setTo(new InternetAddress(email, email, "utf-8"));
            javaMailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tempPw;
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
}