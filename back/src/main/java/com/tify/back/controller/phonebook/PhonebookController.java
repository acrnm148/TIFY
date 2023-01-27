package com.tify.back.controller.phonebook;


import com.tify.back.dto.phonebook.PhonebookDto;
import com.tify.back.service.phonebook.PhonebookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phonebook")
public class PhonebookController {

    private final PhonebookService phonebookService;

    public PhonebookController(PhonebookService phonebookService) {
        this.phonebookService = phonebookService;
    }

    @GetMapping
    public ResponseEntity<List<PhonebookDto>> getAllPhonebookEntries() {
        List<PhonebookDto> phonebookEntries = phonebookService.getAllPhonebookEntries();
        return ResponseEntity.ok(phonebookEntries);
    }

    @PostMapping
    public ResponseEntity<PhonebookDto> addPhonebookEntry(@RequestBody PhonebookDto phonebookDto) {
        PhonebookDto addedEntry = phonebookService.addPhonebookEntry(phonebookDto);
        return ResponseEntity.ok(addedEntry);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePhonebookEntry(@PathVariable Long id) {
        phonebookService.deletePhonebookEntry(id);
        return ResponseEntity.noContent().build();
    }
}

