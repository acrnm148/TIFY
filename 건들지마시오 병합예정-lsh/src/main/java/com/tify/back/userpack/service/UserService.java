package com.tify.back.userpack.service;


import com.tify.back.userpack.dto.UserDTO;
import com.tify.back.userpack.entity.User;
import com.tify.back.userpack.respository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<UserDTO> searchUsersByNickname(String nickname) {
        List<User> users = userRepository.findByNicknameIgnoreCaseContaining(nickname);
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUser_id(user.getUser_id());
            userDTO.setUsername(user.getUsername());
            userDTO.setNickname(user.getNickname());
            userDTO.setProfImgUrl(user.getProfImgUrl());
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }
}
