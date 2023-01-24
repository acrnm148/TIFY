package com.tify.back.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.tify.back.auth.jwt.JwtProperties;
import com.tify.back.auth.jwt.JwtToken;
import com.tify.back.auth.jwt.refreshToken.RefreshToken;
import com.tify.back.auth.jwt.service.JwtProviderService;
import com.tify.back.dto.UserProfileDto;
import com.tify.back.dto.request.EmailAuthRequestDto;
import com.tify.back.dto.request.JoinRequestDto;
import com.tify.back.dto.request.LoginRequestDto;
import com.tify.back.dto.response.JoinResponseDto;
import com.tify.back.dto.response.LoginResponseDto;
import com.tify.back.model.EmailAuth;
import com.tify.back.model.User;
import com.tify.back.repository.EmailAuthCustomRepository;
import com.tify.back.repository.EmailAuthRepository;
import com.tify.back.repository.UserRepository;
import com.tify.back.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * 실제 JWT 토큰과 관련된 서비스
 * refresh 토큰을 검사 -> 유효하면 access
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final EmailService emailService;
    private final JwtProviderService jwtProviderService; //얘 추가하고 오류

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final EmailAuthCustomRepository emailCustomRepository;
    private final EmailAuthRepository emailRepository;

    /**
     * DTO로 들어온 값으로 회원가입
     */
    @Transactional
    public JoinResponseDto register(JoinRequestDto requestDto) {
        //중복 유저 체크 - 중복되면 true
        if (validateDuplicated(requestDto.getUserid())) {
            return null;
        }
        /*
        //이메일 인증 false로 초기화
        EmailAuth emailAuth = emailRepository.save(
                EmailAuth.builder()
                        .email(requestDto.getEmail())
                        .authToken(UUID.randomUUID().toString())
                        .expired(false)
                        .build());
        */

        //회원가입
        User user = userRepository.save(
                User.builder()
                        .userid(requestDto.getUserid())
                        .profileImg("/no_img.png")
                        .tel(requestDto.getTel())
                        .username(requestDto.getUsername())
                        .nickname(requestDto.getNickname())
                        .addr1(requestDto.getAddr1())
                        .addr2(requestDto.getAddr2())
                        .zipcode(requestDto.getZipcode())
                        .birth(requestDto.getBirth())
                        .birthYear(requestDto.getBirthYear())
                        .gender(requestDto.getGender())
                        .roles("USER")
                        .email(requestDto.getEmail())
                        .password(bCryptPasswordEncoder.encode(requestDto.getPassword()))
                        .provider(requestDto.getProvider())
                        .emailAuth(true)
                        .createTime(LocalDateTime.now())
                        .build());

        //이메일 인증
        //System.out.println("emailAuth 저장된 내용: "+emailAuth.getAuthToken()+" ");
        //emailService.send(emailAuth.getEmail(), emailAuth.getAuthToken());
        //String authToken = sendEmailAuth(requestDto.getEmail());
        EmailAuth emailAuth = emailRepository.findByEmail(requestDto.getEmail());
        String authToken = emailAuth.getAuthToken();
        System.out.println("회원가입 중 authToken 확인: "+authToken);

        return JoinResponseDto.builder()
                .userid(user.getUserid())
                .email(user.getEmail())
                //.authToken(emailAuth.getAuthToken())
                .authToken(authToken)
                .build();
    }

    /**
     * 인증 메일 전송
     */
    @Transactional
    public String sendEmailAuth(String email) {
        System.out.println("인증 메일 전송");
        //이메일 인증 false로 초기화
        EmailAuth emailAuth = emailRepository.save(
                EmailAuth.builder()
                        .email(email)
                        .authToken(UUID.randomUUID().toString())
                        .expired(false)
                        .build());
        //이메일 인증
        System.out.println("sendEmailAuth 함수 진입, emailAuth 저장된 내용: "+emailAuth.getAuthToken()+" ");
        emailService.send(emailAuth.getEmail(), emailAuth.getAuthToken());
        return emailAuth.getAuthToken();
    }

    /**
     * 이메일 인증 성공
     */
    @Transactional
    public String confirmEmail(EmailAuthRequestDto requestDto) {
        System.out.println("요청 이메일:"+requestDto.getEmail());
        EmailAuth emailAuth = emailCustomRepository.findValidAuthByEmail(requestDto.getEmail(), requestDto.getAuthToken(), LocalDateTime.now()).get();
        //User user = userRepository.findByEmail(requestDto.getEmail());
        emailAuth.useToken(); //이메일 인증 상태 true 로 바꿔줌
        //System.out.println("이메일 인증 상태 변경:"+emailAuth.getExpired()+" / "+user.getEmailAuth());
        //user.emailVerifiedSuccess(); //이메일 인증 성공
        //return user;
        return emailAuth.getAuthToken();
    }

    /**
     * 일반 로그인
     */
    @Transactional
    public LoginResponseDto login(LoginRequestDto requestDto) {
        User user = userRepository.findByUserid(requestDto.getUserid());
        if (user != null) {
            //비밀번호 안맞을 때
            if (!bCryptPasswordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
                System.out.println("비밀번호가 일치하지 않습니다.");
                return null;
            }
            //이메일 인증 안했을 때
            if (!user.getEmailAuth()) {
                System.out.println("이메일 인증이 필요합니다.");
                return null;
            }
            String newRefreshToken = jwtProviderService.createRefreshToken(user.getId(), user.getUserid());
            RefreshToken refreshToken = new RefreshToken(newRefreshToken);

            user.updateRefreshToken(refreshToken);
            return new LoginResponseDto(user.getId(), user.getUserid(), jwtProviderService.createAccessToken(user.getId(),user.getUserid()), newRefreshToken);
        }
        System.out.println("유저가 존재하지 않습니다.");
        return null;
    }

    /**
     * 유저 정보 조회
     * accessToken을 복호화(디코딩)해서 유저 정보 가져옴
     */
    @Transactional
    public UserProfileDto getUser(String accessToken) {
        try {
            //복호화된 JWT
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(accessToken);
            String userid = decodedJWT.getClaim("userid").asString();
            User user = userRepository.findByUserid(userid);

            UserProfileDto userProfileDto = UserProfileDto.builder()
                    .userid(user.getUserid())
                    .profileImg(user.getProfileImg())
                    .tel(user.getTel())
                    .username(user.getUsername())
                    .nickname(user.getNickname())
                    .addr1(user.getAddr1())
                    .addr2(user.getAddr2())
                    .zipcode(user.getZipcode())
                    .birth(user.getBirth())
                    .birthYear(user.getBirthYear())
                    .gender(user.getGender())
                    .roles("USER")
                    .email(user.getEmail())
                    .provider(user.getProvider())
                    //.emailAuth(true)
                    .createTime(LocalDateTime.now())
                    .build();

            System.out.println("유저 프로필 : "+userProfileDto);
            return userProfileDto;
        }catch (Exception e) {
            return null;
        }
    }

    /**
     * 중복 유저 체크
     */
    public boolean validateDuplicated(String userid) {
        if (userRepository.findByUserid(userid) != null) { //중복되면 true
            return true;
        }
        return false;
    }

    public void deleteUser(String userid) {
        userRepository.deleteByUserid(userid);
    }

}
