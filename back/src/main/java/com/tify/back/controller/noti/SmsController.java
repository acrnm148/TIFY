package com.tify.back.controller.noti;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tify.back.dto.noti.FromFrontRequestDTO;
import com.tify.back.dto.noti.MessageDTO;
import com.tify.back.dto.noti.SmsResponseDTO;
import com.tify.back.service.noti.SmsService;
import lombok.RequiredArgsConstructor;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/message")
public class SmsController {

    private final SmsService smsService;

//    @GetMapping("/send")
//    public String getSmsPage() {
//        return "sendSms";
//    }

    @PostMapping("/send")
    public String sendSms(@RequestBody FromFrontRequestDTO messageDto) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {
        SmsResponseDTO response = smsService.sendSms(messageDto);
//        model.addAttribute("response", response);
        return "message sending success";
    }
}
