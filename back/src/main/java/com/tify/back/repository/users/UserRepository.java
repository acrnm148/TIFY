package com.tify.back.repository.users;

import com.tify.back.model.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUserid(String username); //public 빼면 오류난다
    public int deleteByUserid(String userid);
    public User findByPassword(String nowPassword);
    public User findByEmail(String email);
}
