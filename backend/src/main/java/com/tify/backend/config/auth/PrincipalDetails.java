package com.tify.backend.config.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import com.tify.backend.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

/**
 * 시큐리티가 /loginProc 주소요청이 오면 낚아채서 로그인을 진행시킨다.
 * 로그인이 완료되면 시큐리티 session을 만들어준다. (Security ContextHolder 에다가 시큐리티 세션을 저장시킴)
 * 여기서 세션은 Authentication 타입의 객체임
 * Authentication 안에 User정보가 있어야 됨, 그게 UserDetails 객체임
 * User오브젝트 타입 => UserDetails 타입 객체
 *
 * Security Session 영역에 세션정보를 저장하는데, 그 세션의 객체는 Authentication 이고, 여기 유저 정보를 저장할 때는 UserDetails 객체에 저장한다.
 * 
 * 밑에서 implements UserDetails를 함으로써 PrincipalDetails는 UserDetails가 되었다
 */

// Authentication 객체에 저장할 수 있는 유일한 타입
public class PrincipalDetails implements UserDetails, OAuth2User{

    private static final long serialVersionUID = 1L;
    private User user; //컴포지션
    private Map<String, Object> attributes;

    // 일반 시큐리티 로그인시 사용 **
    public PrincipalDetails(User user) {
        this.user = user;
    }

    // OAuth2.0 로그인시 사용 **
    public PrincipalDetails(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    public User getUser() {
        return user;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { //계정이 잠겼나
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() { //활성화돼있나
        // 우리사이트에서 1년동안 회원이 로그인을 안하면 휴면계정을 하기로 했을 때 사용하는 메소드 - loginDate 필드를 따로 만들어야 함
        // 현재시간 - 로그인시간 => 1년 초과하면 false리턴하게 하면 된다
        return true;
    }

    /**
     * 해당 유저의 권한(Role)을 리턴하는 곳
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collet = new ArrayList<GrantedAuthority>();
        collet.add(()->{ return user.getRole();}); //granted authority 타입인데 람다
        return collet;
    }

    // 리소스 서버로 부터 받는 회원정보
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    // User의 PrimaryKey
    @Override
    public String getName() {
        return user.getId()+"";
    }

}
