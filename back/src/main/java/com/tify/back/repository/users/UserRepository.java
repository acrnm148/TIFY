package com.tify.back.repository.users;

import com.tify.back.dto.admin.UserListMap;
import com.tify.back.model.gifthub.Product;
import com.tify.back.model.users.User;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findById(Long id);
    public User findByUserid(String username); //public 빼면 오류난다
    public int deleteByUserid(String userid);
    public User findByPassword(String nowPassword);
    @Query("SELECT u FROM User u WHERE u.email LIKE :email")
    User ownFindByEmail(@Param("email") String email);
    User findByEmail(String email);
    public User findByNickname(String nickname);

    @Query("SELECT u FROM User u WHERE u.nickname LIKE %:nickname%")
    List<User> findByNicknameLike(@Param("nickname") String nickname);

    @Query("SELECT u FROM User u ORDER BY u.username ASC")
    Page<UserListMap> findAllUsers(Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.email LIKE %:email% ORDER BY u.username ASC")
    Page<UserListMap> findAllUsersByEmail(Pageable pageable,@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.email LIKE %:email% ORDER BY u.username ASC")
    List<User> findUserListByEmail(@Param("email") String email);

}