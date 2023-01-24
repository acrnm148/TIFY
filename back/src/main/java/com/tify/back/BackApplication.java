package com.tify.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BackApplication {

    @Bean
    public BCryptPasswordEncoder encodePwd() {return new BCryptPasswordEncoder();}

    public static void main(String[] args) {
        SpringApplication.run(BackApplication.class, args);
    }

}
