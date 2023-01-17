package com.tify.backend.repository;

import com.tify.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 *
 * @author cos
 * JPA는 기본 CRUD를 JpaRepository가 상속하는 CrudRepository가 가지고 있음.
 * JPA는 method names 전략을 가짐. README.md 사진 참고
 */

// JpaRepository 를 상속하면 자동 컴포넌트 스캔됨. => @Repository가 필요없음, 필요한 곳에서 얘를 autowired해서 마음대로 쓰면 됨
public interface UserRepository extends JpaRepository<User, Integer>{ //기본적인 CRUD를 함
    
    // findBy 규칙
    // SELECT * FROM user WHERE username = ?1
    User findByUsername(String username);

    // SELECT * FROM user WHERE provider = ?1 and providerId = ?2
    Optional<User> findByProviderAndProviderId(String provider, String providerId);

    User findByEmail(String email);
}