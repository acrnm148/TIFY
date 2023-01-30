package com.tify.back.repository.users;

import com.tify.back.dto.admin.UserListMap;
import com.tify.back.model.users.User;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public User findByUserid(String username); //public 빼면 오류난다
    public int deleteByUserid(String userid);
    public User findByPassword(String nowPassword);
    public User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.nickname LIKE %:nickname%")
    List<User> findByNicknameLike(String nickname);

    @Query("SELECT u FROM User u ORDER BY u.username ASC")
    Page<UserListMap> findAllUsers(Pageable pageable);

}
