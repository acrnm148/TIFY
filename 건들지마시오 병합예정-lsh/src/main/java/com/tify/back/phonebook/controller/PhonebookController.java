package com.tify.back.phonebook.controller;

import com.tify.back.phonebook.dto.PhonebookDto;
import com.tify.back.phonebook.service.PhonebookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/phonebook")
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

