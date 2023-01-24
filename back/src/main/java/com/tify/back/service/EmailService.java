package com.tify.back.service;

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

import javax.mail.Message;
import java.util.Random;

@Service
@EnableAsync
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;

    @Async
    public void send(String email, String authToken) {
        System.out.println("이메일 전송 함수 진입:"+email+" "+authToken);
        SimpleMailMessage smm = new SimpleMailMessage();
        smm.setTo(email);//+"@gmail.com"
        smm.setSubject("[TIFY] 회원가입 이메일 인증");
        smm.setText("http://localhost:8080/account/confirmEmail?email="+email+"&authToken="+authToken);

        System.out.println(smm);
        javaMailSender.send(smm);
    }
}