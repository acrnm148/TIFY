package com.tify.back.service.noti;

import com.tify.back.dto.noti.NotiDto;
import com.tify.back.model.noti.Noti;
import com.tify.back.repository.noti.NotiRepository;
import com.tify.back.repository.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotiService {
    private final NotiRepository notiRepository;
    private final UserRepository userRepository;

    public Noti saveNoti(Noti noti) {
        return notiRepository.save(noti);
    }

    public List<Noti> saveNoties(List<Noti> noties) {
        return notiRepository.saveAll(noties);
    }

    public List<Noti> getNoties() {
        return notiRepository.findAll();
    }

    public Noti getNotiById(Long id) {
        return notiRepository.findById(id).orElse(null);
    }
    public String deleteImg(Long id) {
        notiRepository.deleteById(id);
        return "noti removed !!" + id;
    }

    public Noti createNoti(NotiDto notiDto, Long userId) {
        Noti noti = notiDto.toEntity();
        noti.setUser(userRepository.findById(userId).orElse(null));
        return notiRepository.save(noti);
    }
}
