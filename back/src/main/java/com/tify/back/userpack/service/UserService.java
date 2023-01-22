package com.tify.back.userpack.service;


import com.tify.back.userpack.entity.User;
import com.tify.back.userpack.respository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public User save(User user) {
        return userRepository.save(user);
    }
}
