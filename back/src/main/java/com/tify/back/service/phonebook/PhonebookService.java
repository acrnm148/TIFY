package com.tify.back.service.phonebook;


import com.tify.back.dto.phonebook.PhonebookDto;
import com.tify.back.model.phonebook.Phonebook;
import com.tify.back.repository.phonebook.PhonebookRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PhonebookService {
    private final PhonebookRepository phonebookRepository;

    // Phonebook 데이터 저장 서비스
    public Phonebook findPhonebookByMyId(Long myId) {
        return phonebookRepository.findById(myId).orElse(null);
    }

    public boolean savePhonebook(PhonebookDto dto) {
        Phonebook phonebook = dto.toEntity(phonebookRepository);
        phonebookRepository.save(phonebook);
        try {
            phonebookRepository.save(phonebook);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public List<Phonebook> getPhonebookByMyId(long myId) {
        return phonebookRepository.findByMyId(myId);
    }

    public String deletePhonebookById(Long id) {
        Phonebook phonebook = phonebookRepository.findById(id).orElse(null);
        phonebookRepository.delete(phonebook);
        return "phonebook deleted";
    }
}