package com.tify.back.service.users;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.tify.back.auth.jwt.JwtProperties;
import com.tify.back.auth.jwt.JwtToken;
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
import com.tify.back.exception.UserLoginException;
import com.tify.back.model.friend.FriendStatus;
import com.tify.back.model.gifthub.Cart;
import com.tify.back.model.users.EmailAuth;
import com.tify.back.model.users.User;
import com.tify.back.model.users.UserProperties;
import com.tify.back.repository.users.EmailAuthCustomRepository;
import com.tify.back.repository.users.EmailAuthRepository;
import com.tify.back.repository.users.UserRepository;

import com.tify.back.service.friend.FriendService;
import java.util.ArrayList;
import java.util.List;

import com.tify.back.service.gifthub.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.security.auth.login.LoginException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

/**
 * 실제 JWT 토큰과 관련된 서비스
 * refresh 토큰을 검사 -> 유효하면 access
 */
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final EmailService emailService;
    private final JwtProviderService jwtProviderService; //얘 추가하고 오류

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;
    private final EmailAuthCustomRepository emailCustomRepository;
    private final EmailAuthRepository emailRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    private final StringRedisTemplate redisTemplate;
    private final CartService cartService;
    private final FriendService friendService;

    /**
     * DTO로 들어온 값으로 회원가입
     */
    @Transactional
    public JoinResponseDto register(JoinRequestDto requestDto) {
        //중복 유저 체크 - 중복되면 true
        if (validateDuplicated(requestDto.getUserid())) {
            System.out.println("유저가 존재합니다.");
            JoinResponseDto responseDto = new JoinResponseDto();
            responseDto.setResult(UserProperties.EXISTED_USER);
            return responseDto;
        }

        //이메일 인증 여부 확인
        //Boolean emailState = false;
        List<EmailAuth> emailAuths = emailRepository.findAllByEmail(requestDto.getEmail());

        if (emailAuths.size() == 0 || emailAuths.get(emailAuths.size()-1).getExpired() ==false) {
            System.out.println("이메일 인증이 필요합니다.");
            JoinResponseDto responseDto = new JoinResponseDto();
            responseDto.setResult(UserProperties.NO_CHECKED_EMAIL);
            return responseDto;
        }
        //emailState = true;

        //회원가입
        User user = userRepository.save(
                User.builder()
                        .userid(requestDto.getUserid())
                        .profileImg(requestDto.getProfile_img())
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

        String authToken = emailAuths.get(emailAuths.size()-1).getAuthToken();
        System.out.println("회원가입 중 authToken 확인: "+authToken);

        // 유저 고유 cart 생성.
        Cart cart = new Cart();
        cart.setUser(user);
        cartService.saveCart(cart);
        user.setCart(cart);
        return JoinResponseDto.builder()
                .userid(user.getUserid())
                .email(user.getEmail())
                .result(UserProperties.SUCCESS)
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
    public String confirmEmail(String email) {
        System.out.println("요청 이메일:"+email);
        List<EmailAuth> list = emailRepository.findAllByEmail(email);
        String authToken = list.get(list.size()-1).getAuthToken();
        Optional<EmailAuth> option = emailCustomRepository.findValidAuthByEmail(email, authToken, LocalDateTime.now());
        if (option.isPresent()) {
            EmailAuth emailAuth = option.get();
            emailAuth.useToken(); //이메일 인증 상태 true 로 바꿔줌
        } else {
            return null;
        }
        String successAuthHtml2 = "<div style=\"font-family: 'Nanum Gothic', 'sans-serif' !important; width: 100%;\">"
                +	"<img src=\"https://tifyimage.s3.ap-northeast-2.amazonaws.com/beadedaf-bd8c-4765-b097-f9cd6d545db1.png\" style=\"width:89%;\"/>"
                +"</div>";
        return successAuthHtml2;
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
                System.out.println("저장된pw:"+user.getPassword()+" / 날아온pw:"+requestDto.getPassword());
                System.out.println("비밀번호가 일치하지 않습니다.");
                return null;
            }
            JwtToken newJwtToken = jwtProviderService.createJwtToken(user.getId(), user.getUserid());
            RefreshToken refreshToken = RefreshToken.builder()
                    .refreshToken(newJwtToken.getRefreshToken())
                    .userid(user.getUserid())
                    .build();
            user.updateRefreshToken(refreshToken);
            return new LoginResponseDto(user.getId(), user.getUserid(), user.getEmail(), newJwtToken.getAccessToken(), newJwtToken.getRefreshToken(), user.getRoles());
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
        //try {
            //복호화된 JWT
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(accessToken);
            String userid = decodedJWT.getClaim("userid").asString();
            System.out.println("userid:"+userid);
            User user = userRepository.findByUserid(userid);

            System.out.println("현재 암호화된 비밀번호: "+user.getPassword());

            UserProfileDto userProfileDto = UserProfileDto.builder()
                    .id(user.getId())
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
//        }catch (Exception e) {
//            return null;
//        }
    }

    /**
     * 유저 정보 수정
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
        user.setUsername(dto.getUsername());
        user.setTel(dto.getTel());
        user.setZipcode(dto.getZipcode());
        user.setNickname(dto.getNickname());
        user.setAddr1(dto.getAddr1());
        user.setAddr2(dto.getAddr2());

        userRepository.save(user);
        return user;
    }

    /**
     * 프로필이미지 변경
     */
    @Transactional
    public User updateProfImg(User user, String imgUrl) {
        if (imgUrl==null || imgUrl.equals("")) {
            user.setProfileImg("https://tifyimage.s3.ap-northeast-2.amazonaws.com/5e1dc3dc-12c3-4363-8e91-8676c44f122b.png");
        } else {
            user.setProfileImg(imgUrl);
        }
        userRepository.save(user);
        return user;
    }

    /**
     * 회원 탈퇴
     */
    @Transactional
    public void deleteUser(String userid) {
        User user = userRepository.findByUserid(userid);
        refreshTokenRepository.deleteById(user.getJwtRefreshToken().getId());
        //user.setJwtRefreshToken(null);
        user.setRoles("DELETED_USER");
        user.setUserid("!"+user.getUserid());
        user.setEmail("!"+user.getEmail());
        //emailRepository.deleteByEmail(userid);
        //userRepository.deleteByUserid(userid);
    }

    /**
     * Redis를 이용한 로그아웃
     */
    @Transactional
    public void logout(String accessToken) {
        UserProfileDto user = getUser(accessToken);
        if (user == null) {
            System.out.println("해당 엑세스토큰을 가진 유저가 없습니다.");
            throw new UserLoginException("잘못된 접근");
        }
        String refreshToken = user.getRefreshToken();
        if (refreshToken == null) {
            System.out.println("이미 로그아웃한 사용자입니다.");
            throw new UserLoginException("이미 로그아웃한 사용자입니다.");
        }

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
     * accesstoken 복호화해서 userid 추출
     */
    @Transactional
    public String getUserid(String token) {
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token);
        String userid = decodedJWT.getClaim("userid").asString();
        return userid;
    }

    /**
     * refreshToken 복호화해서 userid 추출
     */
    public String getUseridByRefresh(String refreshToken) {
        DecodedJWT verify = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(refreshToken);
        String userid = verify.getClaim("userid").asString();
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

    /**
     * 메일 내용을 생성하고 임시 비밀번호로 회원 비밀번호를 변경
     */
    public void sendMailAndChangePassword(User user) {
        String newPw = emailService.sendPwMail(user.getEmail(), user.getUsername());
        updatePassword(user, newPw);
    }


    /**
     * 유저 비밀번호 변경
     */
    @Transactional
    public void updatePassword(User user, String tempPw){
        // test
        System.out.println("수정 전 비밀번호:"+user.getPassword());
        String encodedPw = bCryptPasswordEncoder.encode(tempPw);
        System.out.println("수정 후 비밀번호:"+encodedPw);

        user.setPassword(encodedPw);
        userRepository.save(user);
        System.out.println("수정된 유저:"+user);
        System.out.println("수정된 비밀번호:"+user.getPassword());

        System.out.println("비밀번호 변경 완료 "+tempPw);
    }

    // test용 계정 생성
    @Transactional
    public User save(User user) {
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
                Long friendshipId = friendService.getFriendshipId(myId, user.getId());
                SearchedUserDto searchedUser = SearchedUserDto.builder()
                    .id(user.getId())
                    .profileImg(user.getProfileImg())
                    .name(user.getUsername())
                    .nickname(user.getNickname())
                    .email(user.getEmail())
                    .friendshipId(friendshipId)
                    .state(friendStatus)
                    .build();

                searchedUsers.add(searchedUser);
            }
        }

        return searchedUsers;
    }



}
