package com.tify.backend.config.auth;

import com.tify.backend.entity.User;
import com.tify.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Security Session (내부에 Authentication (내부에 UserDetails 있음
 * UserDetailService
 */
// 시큐리티 설정에서 (SecurityConfig) loginProcessingUrl("/loginProc");
// => /loginProc 요청이 오면 자동으로 UserDetailService 타입으로 IoC되어 있는 loadUserByUsername 함수가 실행됨
@Service
public class PrincipalDetailsService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { //이렇게 되면 이름으로 로그인
        User user = userRepository.findByUsername(username); //유저 이름 중복 검사
        if(user == null) { //유저가 없으면
            User user2 = userRepository.findByEmail(user.getEmail()); //이메일 중복 검사
            if (user2 == null) return null;
            else return new PrincipalDetails(user2);
        }else { //유저를 찾으면 
            return new PrincipalDetails(user); //일반로그인
        }
    }


}
