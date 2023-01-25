package com.tify.back.repository.users;


import com.tify.back.model.users.EmailAuth;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;

@Primary
//@Repository
public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long>, EmailAuthCustomRepository {
    public EmailAuth findByEmail(String email);
    public int deleteByEmail(String userid);
}
