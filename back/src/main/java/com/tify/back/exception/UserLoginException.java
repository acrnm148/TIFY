package com.tify.back.exception;

public class UserLoginException extends RuntimeException {
    public UserLoginException(String message) {
        super(message);
    }
}