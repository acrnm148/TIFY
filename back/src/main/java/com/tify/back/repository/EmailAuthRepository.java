package com.tify.back.repository;


import com.tify.back.model.EmailAuth;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Primary
//@Repository
public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long>, EmailAuthCustomRepository {
    public EmailAuth findByEmail(String email);
}
