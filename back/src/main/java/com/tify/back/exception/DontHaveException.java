package com.tify.back.exception;

public class DontHaveException extends RuntimeException {
    public DontHaveException(String message) {
        super(message);
    }
}