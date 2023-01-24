package com.tify.back.phonebook.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhonebookDto {

    private Long userId;
    private String name;
    private String phoneNumber;

    // getters and setters
}
