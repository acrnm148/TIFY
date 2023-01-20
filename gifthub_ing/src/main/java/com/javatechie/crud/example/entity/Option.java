package com.javatechie.crud.example.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "option")
public class Option {
    @Id
    @GeneratedValue
    @Column(name = "option_id")
    private int id;
    private int price; //옵션 추가요금
    private int title; // 옵션 이름
}
