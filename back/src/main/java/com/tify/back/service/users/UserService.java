package com.tify.back.service.users;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.tify.back.auth.jwt.JwtProperties;
import com.tify.back.auth.jwt.refreshToken.RefreshToken;
import com.tify.back.auth.jwt.refreshToken.RefreshTokenRepository;
import com.tify.back.auth.jwt.service.JwtProviderService;
import com.tify.back.dto.users.SearchedUserDto;
import com.tify.back.dto.users.UserProfileDto;
import com.tify.back.dto.users.UserUpdateDto;
import com.tify.back.dto.users.request.EmailAuthRequestDto;
import com.tify.back.dto.users.request.JoinRequestDto;
import com.tify.back.dto.users.request.LoginRequestDto;
import com.tify.back.dto.users.response.JoinResponseDto;
import com.tify.back.dto.users.response.LoginResponseDto;
import com.tify.back.model.friend.FriendStatus;
import com.tify.back.model.gifthub.Cart;
import com.tify.back.model.users.EmailAuth;
import com.tify.back.model.users.User;
import com.tify.back.repository.users.EmailAuthCustomRepository;
import com.tify.back.repository.users.EmailAuthRepository;
import com.tify.back.repository.users.UserRepository;

import java.util.ArrayList;
import java.util.List;

import com.tify.back.service.friend.FriendService;
import com.tify.back.service.gifthub.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
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
    private final FriendService friendService;
    private final EmailService emailService;
    private final JwtProviderService jwtProviderService; //얘 추가하고 오류

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final EmailAuthCustomRepository emailCustomRepository;
    private final EmailAuthRepository emailRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    private final StringRedisTemplate redisTemplate;
    private final CartService cartService;

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

        Boolean emailState = false;
        if (emailRepository.findByEmail(requestDto.getEmail()).size() != 0) {
            emailState = true;
        }

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
                        .emailAuth(emailState)
                        .createTime(LocalDateTime.now())
                        .build());

        //이메일 인증
        //System.out.println("emailAuth 저장된 내용: "+emailAuth.getAuthToken()+" ");
        //emailService.send(emailAuth.getEmail(), emailAuth.getAuthToken());
        //String authToken = sendEmailAuth(requestDto.getEmail());
        List<EmailAuth> emailAuth = emailRepository.findByEmail(requestDto.getEmail());
        if (emailAuth.size() == 0) {
            System.out.println("이메일 인증이 필요합니다.");
            return null;
        }
        String authToken = emailAuth.get(0).getAuthToken();
        System.out.println("회원가입 중 authToken 확인: "+authToken);

        // 유저 고유 cart 생성.
        Cart cart = new Cart();
        cart.setUser(user);
        cartService.saveCart(cart);
        user.setCart(cart);
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
        System.out.println("getUser 함수 진입");
        try {
            //복호화된 JWT
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(accessToken);
            String userid = decodedJWT.getClaim("userid").asString();
            User user = userRepository.findByUserid(userid);

            System.out.println("현재 암호화된 비밀번호: "+user.getPassword());

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
                    .refreshToken(user.getJwtRefreshToken().getRefreshToken())
                    .createTime(LocalDateTime.now())
                    .build();

            System.out.println("유저 프로필 : "+userProfileDto);
            return userProfileDto;
        }catch (Exception e) {
            return null;
        }
    }

    /**
     * 유저 정보 수정
     * 프로필이미지 변경, 비밀번호 변경
     */
    @Transactional
    public User updateUserInfo(UserUpdateDto dto) {
        User user = userRepository.findByUserid(dto.getUserid());
        if (dto.getTel() == null || dto.getNickname() == null ||
                dto.getZipcode() == null || dto.getAddr1() == null ||
                dto.getAddr2()==null) {
            System.out.println("입력란이 비었습니다.");
            return null;
        }
        user.setTel(dto.getTel());
        user.setZipcode(dto.getZipcode());
        user.setNickname(dto.getNickname());
        user.setAddr1(dto.getAddr1());
        user.setAddr2(dto.getAddr2());

        //프로필사진 변경
        if (dto.getProfileImg()==null || dto.getProfileImg().equals("")) {
            user.setProfileImg("/no_img.png");
        } else {
            user.setProfileImg(dto.getProfileImg());
        }

        //비밀번호 변경
        System.out.println("현재 암호화된 비밀번호: "+user.getPassword());
        User userById = userRepository.findByUserid(dto.getUserid());
        User userByPw = userRepository.findByPassword(user.getPassword());
        if (userById.equals(userByPw)) { //id와 pw가 일치하면
            user.setPassword(bCryptPasswordEncoder.encode(dto.getNewPassword()));
        } else {
            System.out.println("현재 비밀번호가 일치하지 않습니다.");
            return null;
        }

        userRepository.save(user);
        return user;
    }


    /**
     * 회원 탈퇴
     */
    @Transactional
    public void deleteUser(String userid) {
        emailRepository.deleteByEmail(userid);
        userRepository.deleteByUserid(userid);
    }

    /**
     * Redis를 이용한 로그아웃
     */
    @Transactional
    public void logout(String accessToken) {
        UserProfileDto user = getUser(accessToken);
        String refreshToken = user.getRefreshToken();

        //1. accessToken redisTemplate 블랙리스트 추가
        ValueOperations<String, String> logoutValueOperations = redisTemplate.opsForValue();
        logoutValueOperations.set(accessToken, "logout"); // redis set 명령어

        //2. refreshToken 삭제
        RefreshToken rf = refreshTokenRepository.findByRefreshToken(refreshToken).get();
        User userEntity = userRepository.findByUserid(user.getUserid());
        userEntity.setJwtRefreshToken(null);//부모에서 삭제
        refreshTokenRepository.deleteById(rf.getId());//자식에서 삭제
    }


    /**
     * accesstoken 복호화해서 유저 아이디 추출
     */
    @Transactional
    public String getUserid(String token) {
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token);
        String userid = decodedJWT.getClaim("userid").asString();
        return userid;
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

    // test용 계정 생성
    @Transactional
    public User save(User user) {
        user.setRoles("USER");
        return userRepository.save(user);
    }


    public List<SearchedUserDto> searchUserByNickname(String nickname, Long myId) {
        List<User> users = userRepository.findByNicknameLike(nickname);
        List<SearchedUserDto> searchedUsers = new ArrayList<>();
        if (searchedUsers != null) {
            for (User user : users) {
                //SearchedUserDto searchedUser = new SearchedUserDto();
                //Long id = userRepository.findByEmail(myId)
                FriendStatus friendStatus = friendService.getFriendshipStatus(myId, user.getId());
                SearchedUserDto searchedUser = SearchedUserDto.builder()
                        .id(user.getId())
                        .profileImg(user.getProfileImg())
                        .nickname(user.getNickname())
                        .email(user.getEmail())
                        .state(friendStatus)
                        .build();

                searchedUsers.add(searchedUser);
            }
        }

        return searchedUsers;
    }


}