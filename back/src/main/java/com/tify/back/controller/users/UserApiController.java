package com.tify.back.controller.users;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.tify.back.auth.jwt.JwtProperties;
import com.tify.back.auth.jwt.JwtToken;
import com.tify.back.auth.jwt.service.JwtProviderService;
import com.tify.back.auth.jwt.service.JwtService;
import com.tify.back.dto.users.MailDto;
import com.tify.back.dto.users.UserProfileDto;
import com.tify.back.dto.users.UserUpdateDto;
import com.tify.back.dto.users.request.EmailAuthRequestDto;
import com.tify.back.dto.users.request.FindPwRequestDto;
import com.tify.back.dto.users.request.JoinRequestDto;
import com.tify.back.dto.users.request.LoginRequestDto;
import com.tify.back.dto.users.response.DataResponseDto;
import com.tify.back.dto.users.response.JoinResponseDto;
import com.tify.back.dto.users.response.LoginResponseDto;
import com.tify.back.exception.UserLoginException;
import com.tify.back.model.users.EmailAuth;
import com.tify.back.repository.users.EmailAuthRepository;
import com.tify.back.service.users.EmailService;
import com.tify.back.service.users.UserService;
import com.tify.back.model.users.User;
import com.tify.back.oauth.provider.Token.GoogleToken;
import com.tify.back.oauth.provider.Token.KakaoToken;
import com.tify.back.oauth.provider.Token.NaverToken;
import com.tify.back.oauth.service.GoogleService;
import com.tify.back.oauth.service.KakaoService;
import com.tify.back.oauth.service.NaverService;
import com.tify.back.repository.users.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Tag(name = "user", description = "유저 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserApiController {

    private final EmailAuthRepository emailAuthRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserService userService;
    private final EmailService emailService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final KakaoService kakaoService;
    private final NaverService naverService;
    private final GoogleService googleService;
    private final JwtProviderService jwtProviderService;

    private final RedisTemplate<String, String> redisTemplate;


    @GetMapping("/home")
    public String home() {
        return "home";
    }

    /**
     * JWT 를 이용한 일반 로그인
     */
    @Operation(summary = "login", description = "일반 로그인")
    @PostMapping("/account/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto requestDto) {
        LoginResponseDto responseDto = userService.login(requestDto);
        if (responseDto == null) {
            return ResponseEntity.ok().body("로그인에 실패했습니다.");//"로그인에 실패했습니다.");
        }
        return ResponseEntity.ok().body(responseDto);
    }

    /**
     * JWT 를 이용한 일반 회원가입
     */
    @Operation(summary = "signin", description = "일반 회원가입")
    @PostMapping("/account/signin")
    public ResponseEntity<?> join(@RequestBody JoinRequestDto joinRequestDto){ //authToken, email 받아옴
        JoinResponseDto responseDto = userService.register(joinRequestDto);
        if (responseDto == null) {
            return ResponseEntity.status(HttpStatus.MULTI_STATUS).body("존재하는 유저입니다.");
        }
        //login(new LoginRequestDto(responseDto.getUserid(), responseDto.getPassword()));
        return ResponseEntity.ok().body(responseDto);
   }

    /**
     * 회원가입 - 이메일 인증
     */
    @Operation(summary = "comfirm email", description = "이메일 인증 완료")
    @GetMapping("/account/confirmEmail")
    public ResponseEntity<?> confirmEmail(@ModelAttribute EmailAuthRequestDto requestDto) { //json으로 전달이 안됨
        System.out.println("전송된 링크 진입");
        //User user = userService.confirmEmail(requestDto);
        String authToken = userService.confirmEmail(requestDto);
        //System.out.println("이메일 인증 성공, 이메일 토큰: "+authToken);
        //return ResponseEntity.ok().body("이메일 인증 성공, 이메일 토큰: "+authToken);
        return ResponseEntity.ok().body(authToken);
    }
    /**
     * 이메일 인증 했는지 체크
     */
    @Operation(summary = "comfirm email", description = "이메일 체크")
    @GetMapping("/account/checkEmailState")
    public ResponseEntity<?> checkEmailState(String email) {
        System.out.println("이메일 인증 했는지 체크");
        List<EmailAuth> emailAuths = new ArrayList<>();
        emailAuths = emailAuthRepository.findByEmail(email);
        if (emailAuths.size() == 0) {
            return ResponseEntity.ok().body("N");
        }
        return ResponseEntity.ok().body("Y");

    }

    /**
     * 회원가입 - 이메일 인증 요청
     */
    @Operation(summary = "send email auth", description = "이메일 인증 진행")
    @GetMapping("/account/sendEmailAuth")
    public ResponseEntity<?> sendEmailAuth(@RequestParam("email") String email) {
        System.out.println("이메일 인증 - 이미 가입된 메일 체크 :"+userService.validateDuplicated(email));
        if (userService.validateDuplicated(email)) {
            return ResponseEntity.ok().body("이미 인증이 완료된 이메일입니다.");
        }
        userService.sendEmailAuth(email);
        return ResponseEntity.ok().body(email); //인증된 이메일 리턴
    }

    /**
     * 회원 조회
     */
    @Operation(summary = "user info", description = "유저 프로필 정보를 가져옴")
    @GetMapping("/account/userInfo")
    public ResponseEntity<?> getUserProfile(@RequestHeader(value = "Authorization") String token) {
        try {
            System.out.println("유저 조회 token 체크 : "+token);
            UserProfileDto userProfileDto = userService.getUser(token.substring(7));
            //return ResponseEntity.ok().body(new UserProfileDto(user));
            return ResponseEntity.ok().body(userProfileDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * 회원 탈퇴
     */
    @DeleteMapping("/account/signout")
    public ResponseEntity<?> signout(@RequestHeader("Authorization") String token) { //@RequestHeader(value = "Authorization") String token) {
        try {
            token = token.substring(7);
            if (jwtService.validAccessToken(token) == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("토큰이 만료되었습니다.");
            }
            String userid = userService.getUserid(token);
            userService.deleteUser(userid);
            System.out.println("탈퇴되었습니다.");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("헤더에 토큰이 없습니다.");
        }
    }

    /**
     * 회원 정보 수정
     */
    @PostMapping("/account/update")
    public ResponseEntity<?> updateUserInfo(@RequestBody UserUpdateDto userUpdateDto) { //@RequestHeader(value = "Authorization") String token) {
        try {
            User updatedUser = userService.updateUserInfo(userUpdateDto);
            if (updatedUser != null) {
                System.out.println("수정되었습니다.");
            } else {
                System.out.println("수정에 실패했습니다.");
            }
            return ResponseEntity.ok().body(updatedUser);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("수정에 실패했습니다.");
        }
    }

    /**
     * 로그아웃
     */
    @PostMapping("/account/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        token = token.substring(7);
        userService.logout(token);
        System.out.println("로그아웃 완료");
        return ResponseEntity.ok().body("로그아웃 되었습니다.");
    }

    /**
     *   JWT를 이용한 카카오 로그인
     */
    /**front-end로 부터 받은 인가 코드 받기 및 사용자 정보 받기,회원가입 */
    @GetMapping("/account/auth/login/kakao")
    public Map<String,String> KakaoLogin(@RequestParam("code") String code) {
        //access 토큰 받기
        KakaoToken oauthToken = kakaoService.getAccessToken(code);
        //사용자 정보받기 및 회원가입
        User saveUser = kakaoService.saveUser(oauthToken.getAccess_token());
        //jwt토큰 저장
        JwtToken jwtTokenDTO = jwtService.getJwtToken(saveUser.getUserid());
        return jwtService.successLoginResponse(jwtTokenDTO, saveUser.getUserid());
    }
    //test로 직접 인가 코드 받기
    @GetMapping("/login/oauth2/code/kakao")
    public String KakaoCode(@RequestParam("code") String code) {
        return "카카오 로그인 인증완료, code: "  + code;
    }


    /**
     * JWT를 이용한 네이버 로그인
     */
    @GetMapping("/account/auth/login/naver")
    public Map<String, String> NaverLogin(@RequestParam("code") String code) {
        NaverToken oauthToken = naverService.getAccessToken(code);
        User saveUser = naverService.saveUser(oauthToken.getAccess_token());
        JwtToken jwtToken = jwtService.getJwtToken(saveUser.getUserid());
        return jwtService.successLoginResponse(jwtToken, saveUser.getUserid());
    }
    @GetMapping("/login/oauth2/code/naver")
    public String NaverCode(@RequestParam("code") String code) {
        return "네이버 로그인 인증완료, code: "  + code;
    }

    /**
     * access, refresh token 재발급
     * access 만료 + refresh 유효 => access 재발급
     * refresh 만료 => access, refresh 재발급
     */
    @Operation(summary = "get refresh token", description = "refresh token 재발급")
    @Parameter(description = "userid를 파라미터로 받습니다.")
    @GetMapping("/refresh/{userid}")
    public Map<String,String> refreshToken(@PathVariable("userid") String userid, @RequestHeader("refreshToken") String refreshToken) {
        System.out.println(userid+" / "+refreshToken);

        //String userid = userService.getUserid(refreshToken);
        JwtToken jwtToken = jwtService.validRefreshToken(userid, refreshToken);

        Map<String, String> jsonResponse = jwtService.recreateTokenResponse(jwtToken, userid);
        return jsonResponse;
    }

    /**
     * 닉네임 중복 확인
     */
    @Operation(summary = "check duplicated nickname", description = "닉네임 중복 확인")
    @Parameter(description = "nickname을 파라미터로 받습니다. 중복되면 Y, 중복이 아니라면 N을 리턴합니다.")
    @GetMapping("/dupCheck")
    public ResponseEntity<?> checkDuplicatedNickname(@RequestParam("nickname") String nickname) {
        if (userRepository.findByNickname(nickname) != null) {
            return ResponseEntity.status(HttpStatus.MULTI_STATUS).body("Y");
        }
        return ResponseEntity.ok().body("N");
    }

    /**
     * 유저 권한 확인 (USER, ADMIN)
     */
    @GetMapping("/roleCheck")
    public ResponseEntity<?> checkRole(@RequestParam("userid") String userid) {
        User user = userRepository.findByUserid(userid);
        if (user != null) {
            List<String> list = user.getRoleList();
            return ResponseEntity.status(HttpStatus.MULTI_STATUS).body(list.get(0));
        }
        return ResponseEntity.ok().body("해당 유저가 없습니다.");
    }

    /**
     * 비밀번호 찾기
     */
    @PostMapping("/account/findPw")
    public String findPassword(@RequestParam("email") String email) {
        User user = userRepository.findByUserid(email);
        if (user == null) {
            throw new UserLoginException("이메일이 존재하지 않습니다.");
        }
        userService.sendMailAndChangePassword(email, user.getUsername());
        System.out.println("임시 비밀번호로 변경 완료");

        return "redirect:/login";
    }

}
