package com.tify.back.userpack.respository;

import com.tify.back.userpack.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findByNicknameIgnoreCaseContaining(String nickname);
}