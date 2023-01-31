package com.tify.back.repository.users;


import com.tify.back.model.users.EmailAuth;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Primary
//@Repository
public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long>, EmailAuthCustomRepository {
    public List<EmailAuth> findByEmail(String email); //인증을 여러번 할 수 있으므로 list
    public int deleteByEmail(String userid);
}
