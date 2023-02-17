package com.tify.back.controller.phonebook;

import static com.tify.back.model.phonebook.QPhonebook.phonebook;

import com.tify.back.dto.phonebook.PhonebookDto;
import com.tify.back.model.phonebook.Phonebook;
import com.tify.back.repository.phonebook.PhonebookRepository;
import com.tify.back.service.phonebook.PhonebookService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/phonebook")
public class PhonebookController {

    private final PhonebookRepository phonebookRepository;
    @Autowired
    private final PhonebookService phonebookService;

    @PostMapping("/add")
    public String addPhonebook(@RequestBody PhonebookDto dto) {

        // Validation
        if (dto.getName().equals("")) {
            // No name input
            return "no name given";
        }

        boolean result = phonebookService.savePhonebook(dto);

        if (result) {
            return "phonebook created!";
        } else {
            return "failed to create phonebook!";
        }
    }


    @GetMapping("/{myId}")
    public List<Phonebook> getPhonebookByMyId(@PathVariable("myId") int id) {
        return phonebookService.getPhonebookByMyId(id);
    }

    @PutMapping("/edit/{id}")
    public String editPhonebook(@PathVariable Long id, @RequestBody Phonebook phonebookDto) {
        Phonebook phonebook = phonebookRepository.findById(id).orElse(null);
        if (phonebook == null) {
            return "phonebook not found";
        }
        phonebook.setPhoneNumber(phonebookDto.getPhoneNumber());
        phonebook.setName(phonebookDto.getName());
        phonebookRepository.save(phonebook);
        return "phonebook updated!";
    }

    @DeleteMapping("/delete/{id}")
    public String deletePhonebook(@PathVariable("id") Long id) {
        Optional<Phonebook> phonebookOptional = phonebookRepository.findById(id);
        if (!phonebookOptional.isPresent()) {
            return "phonebook not found!";
        }
        Phonebook phonebook = phonebookOptional.get();
        phonebookRepository.delete(phonebook);
        return "phonebook deleted!";
    }
}
