package com.tify.back.model.phonebook;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "Phonebook")
public class Phonebook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long myId;
    private String phoneNumber;
    private String name;
}