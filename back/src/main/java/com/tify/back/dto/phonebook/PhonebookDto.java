package com.tify.back.dto.phonebook;

import com.tify.back.model.phonebook.Phonebook;
import com.tify.back.repository.phonebook.PhonebookRepository;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PhonebookDto {
    private Long myId;
    private String phoneNumber;
    private String name;

    public Phonebook toEntity(PhonebookRepository phonebookRepository) {
        Phonebook phonebook = new Phonebook();
        phonebook.setMyId(this.myId);
        phonebook.setPhoneNumber(this.phoneNumber);
        phonebook.setName(this.name);
        return phonebook;
    }
}
