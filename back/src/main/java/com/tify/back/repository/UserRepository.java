package com.tify.back.repository;

import com.tify.back.auth.jwt.JwtToken;
import com.tify.back.model.User;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUserid(String username); //public 빼면 오류난다
    public int deleteByUserid(String userid);
    public User findByPassword(String nowPassword);
    public User findByEmail(String email);
}
