package com.tify.back.controller.wish;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.tify.back.dto.noti.FromFrontRequestDTO;
import com.tify.back.dto.noti.MessageDTO;
import com.tify.back.dto.noti.SmsResponseDTO;
import com.tify.back.dto.wish.ThkcardDto;
import com.tify.back.model.phonebook.Phonebook;
import com.tify.back.model.users.User;
import com.tify.back.model.wish.Thkcard;
import com.tify.back.repository.pay.PayRepository;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.repository.wish.ThkcardRepository;
import com.tify.back.service.noti.SmsService;
import com.tify.back.service.wish.ThkcardService;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.io.IOUtils;
import java.io.InputStream;
import java.net.URL;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/thkcards")
public class ThkcardController {
	private final ThkcardService thkcardService;
	private final PayRepository payRepository;
	private final SmsService smsService;
	private final UserRepository userRepository;
	@PostMapping
	public Thkcard saveThkcard(@RequestBody ThkcardDto thkcardDto) throws IOException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException {
		Thkcard thkcard = thkcardDto.toEntity(payRepository);

		User user = userRepository.findById(thkcardDto.getUserId()).orElse(null);

		FromFrontRequestDTO messageDto = new FromFrontRequestDTO();
		List<MessageDTO> messages = new ArrayList<>();
		String tel = thkcardDto.getPhoneNumber().replaceAll("-","");

		URL url = new URL(thkcardDto.getImageUrl());
		InputStream is = url.openStream();
		byte[] bytes = IOUtils.toByteArray(is);
		String encoded = Base64.getEncoder().encodeToString(bytes);

		MessageDTO mtemp = new MessageDTO();
//		Map<String,String> map =new HashMap<>();
//		map.put("name","tify");
//		map.put("body",encoded);

//		List<Map<String,String>> fileList = new ArrayList<>();
//		fileList.add(map);
//		mtemp.setFiles(fileList);

		String content = user.getUsername() + "님이 당신의 축하에 대한 감사편지를 보냈습니다♪\n"
				+"<"+thkcardDto.getTitle()+">\n"
				+thkcardDto.getContent()
				+"\n☆★☆★☆★"
				+"\n∞당신을 위한 축하 TIFY∞\n"
				+"PC 접속후 확인 권장";;
		mtemp.setContent(content);
		mtemp.setSubject("");
		mtemp.setTo(tel);
		messages.add(mtemp);

		messageDto.setMessageList(messages);
		messageDto.setMessageType("MMS");
		SmsResponseDTO response = smsService.sendSms(messageDto);

		return thkcardService.saveThkcard(thkcard);
	}

	@GetMapping("/{userId}")
	public List<Thkcard> findAllByUserId(@PathVariable Long userId) {
		return thkcardService.findAllByUserId(userId);
	}

	/**
	 * payid로 감사카드 불러오기
	 */
	@GetMapping("/match/{celebId}")
	public Thkcard getThkcardByCelebcard(@PathVariable("celebId") Long celebId) {
		Thkcard thkcard = thkcardService.getThkcardByCelebcard(celebId);
		return thkcard;
	}
}