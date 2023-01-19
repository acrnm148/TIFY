package com.tify.backend.controller;


import java.util.Iterator;

import com.tify.backend.config.auth.PrincipalDetails;
import com.tify.backend.entity.User;
import com.tify.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository; //DI

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder; //


    //to be removed start=======================
    @GetMapping({ "", "/" })
    public @ResponseBody String index() {
        return "인덱스 페이지입니다.";
    }

    @GetMapping("/user")
    public @ResponseBody String user(@AuthenticationPrincipal PrincipalDetails principal) {
        System.out.println("Principal : " + principal);
        System.out.println("OAuth2 : "+principal.getUser().getProvider());
        // iterator 순차 출력 해보기
        Iterator<? extends GrantedAuthority> iter = principal.getAuthorities().iterator();
        while (iter.hasNext()) {
            GrantedAuthority auth = iter.next();
            System.out.println(auth.getAuthority());
        }

        return "유저 페이지입니다.";
    }

    @GetMapping("/admin")
    public @ResponseBody String admin() {
        return "어드민 페이지입니다.";
    }

    //@PostAuthorize("hasRole('ROLE_MANAGER')")
    //@PreAuthorize("hasRole('ROLE_MANAGER')")
    @Secured("ROLE_MANAGER")
    @GetMapping("/manager")
    public @ResponseBody String manager() {
        return "매니저 페이지입니다.";
    }

    @GetMapping("/login")
    public String login() {
        return "login1";
    }

    @GetMapping("/joinForm")
    public String join() {
        return "join";
    }
    //to be removed end=======================

    @PostMapping("/joinProc")
    public String joinProc(User user) {
        System.out.println("회원가입 진행 : " + user);
        String rawPassword = user.getPassword(); //받아온 그대로인 비밀번호
        String encPassword = bCryptPasswordEncoder.encode(rawPassword); //=> 패스워드를 암호화하고 DB에 넣어줘야 한다(인코딩)!! (시큐리티로 로그인)
        user.setPassword(encPassword); //인코딩한 데이터를 set 해줌
        user.setRole("ROLE_USER");
        userRepository.save(user); //db에 저장
        return "redirect:/";
    }

    //시큐리티 권한 설정 - 글로벌X, 글로벌로 설정하려면 SecurityConfig에서 할 수 있음
//    @Secured("ROLE_ADMIN")
//    @GetMapping("/admin")
//    public @ResponseBody String admin_() {
//        return "관리자페이지";
//    }
}