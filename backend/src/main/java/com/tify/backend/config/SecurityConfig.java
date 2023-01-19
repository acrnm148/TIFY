package com.tify.backend.config;

import com.tify.backend.config.oauth.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//1. 코드받기(인증) 2. 엑세스토큰받기 (우리시큐리티서버가 구글사용자정보에 접근할수있는 권한(엑세스토큰)을 받는다는것)
//3. 사용자 프로필 정보 가져옴 4. 그 정보를 토대로 회원가입을 자동으로 진행시키기도 함
// 혹은 (이메일, 전화번호, 이름, 아이디) 만 받아올 수 있는데 추가적으로 집주소를 받아야 한다면? -> 추가적인 과정이 필요한데
// 그럴 경우에는 자동회원가입이 아니라 추가적인 회원가입 창이 떠야함


@Configuration // IoC 빈(bean)을 등록
@EnableWebSecurity // 필터 체인 관리 시작 어노테이션
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true) // 특정 주소 접근시 권한 및 인증을 위한 어노테이션 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    //해당 메서드의 리턴되는 오브젝트를 IoC로 등록해준다. => autowired 로 어디서든 쓸 수 있음
    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/user/**").authenticated() //인증만 되면 들어갈 수 있는 주소 (authenticated)
                //.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
                //.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN') and hasRole('ROLE_USER')")
                .antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll()
                .and()
                .formLogin()
                .loginPage("/login")
                .loginProcessingUrl("/loginProc") //loginProc주소가 호출되면 시큐리티가 낚아채서 대신 로그인을 진행 => 시큐리티가 대신 로그인시켜줌...
                .defaultSuccessUrl("/")
                .and()
                .oauth2Login()
                .loginPage("/login") //인증이 필요하면 무조건 login페이지로 가게 설정
                //구글 로그인 완료 후 후처리 Tip. 구글로그인 완료되면 코드받는게 아니라 (엑세스토큰+사용자프로필정보)를 한방에 받을 수 있음
                .userInfoEndpoint()
                .userService(principalOauth2UserService);
    }
}
