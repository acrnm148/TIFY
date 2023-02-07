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
            String htmlStr = "<div style=\"margin: 0 auto;text-align: center; font-family: 'Nanum Gothic', 'sans-serif' !important; width: 540px; height: 600px; margin: 50px auto; padding: 10px 0; box-sizing: border-box;\">"
                    + "<img src='https://tifyimage.s3.ap-northeast-2.amazonaws.com/1c9f3f4b-9f42-4fc2-87e5-45a4cb43e3df.png'/>"
                    +	"<h1 style=\"margin: 0 auto; padding: 0 5px; font-size: 28px;text-align: center;font-weight:400;\">"
                    +		"<span style=\"color: #FE3360; text-align: center;\"><strong>메일인증</strong></span> 안내입니다.</h1>"
                    +	        "<p style=\"margin: 0 auto; font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;text-align: center;\">"
                    +                    "TIFY를 이용해 주셔서 감사드립니다.<br />"
                    +                    "아래 <b style=\"color: #FE3360;\">'메일 인증'</b> 버튼을 클릭하여 이메일 인증을 완료해주세요.<br />"
                    +                    "감사합니다. </p>"
                    +	"<a style=\"margin: 0 auto; color: #FFF; text-decoration: none; text-align: center;\" href=\"https://i8e208.p.ssafy.io/api/account/confirmEmail/"+email+"\" target=\"_blank\"><p style=\"display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background-image: url('https://tifyimage.s3.ap-northeast-2.amazonaws.com/26e901d0-2994-4355-a19e-9b0dd8d8828e.png'); radius:8px; line-height: 45px; vertical-align: middle; font-size: 16px;\"></p></a>"
                    +	"<div style=\"border-top: 1px solid #DDD; padding: 5px;\">"
                    +		"<p style=\"font-size: 13px; line-height: 21px; color: #555;\">"
                    +                    "버튼이 정상적으로 클릭되지 않을 경우 아래 링크를 복사하여 접속해 주세요.<br />"
                    +                    "https://i8e208.p.ssafy.io/api/account/confirmEmail/"+email+"</p>"
                    +	"</div>"
                    +"</div>";
//                    "<h2> 회원가입 이메일 인증</h2>"
//                    + "아래 버튼을 클릭해서 회원가입을 진행해주세요.<br>"
//                    + "<a href='https://i8e208.p.ssafy.io/api/account/confirmEmail?email="+email+"&authToken="+authToken+"' > 인증하기 </a>";

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
            String htmlStr = "<div style=\"margin: 0 auto;text-align: center; font-family: 'Nanum Gothic', 'sans-serif' !important; width: 540px; height: 600px; margin: 50px auto; padding: 10px 0; box-sizing: border-box;\">"
                    + "<img src='https://tifyimage.s3.ap-northeast-2.amazonaws.com/1c9f3f4b-9f42-4fc2-87e5-45a4cb43e3df.png'/>"
                    +	"<h1 style=\"margin: 0 auto; padding: 0 5px; font-size: 28px;text-align: center;font-weight:400;\">"
                    +		"<span style=\"color: #FE3360; text-align: center;\"><strong>임시 비밀번호 발급</strong></span> 안내입니다.</h1>"
                    +	        "<p style=\"margin: 0 auto; font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;text-align: center;\">"
                    +                    "TIFY 임시 비밀번호 안내 관련 메일입니다.<br />"
                    +                    "고객님의 임시 비밀번호는 [<strong>"
                    +                       tempPw + "</strong>] 입니다. <br />로그인 후 비밀번호를 변경해주세요."
                    +                     "<br />감사합니다. </p>"
                    +"</div>";

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
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',':',
                '!','@','#','$','^','*','+','=','-','_' };
        String str = "";
        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        for (int i = 0; i < 10; i++) {
            int idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str+"@";
    }
}