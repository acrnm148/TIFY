package com.tify.back.exception;

public class FAQNotFoundException extends RuntimeException {
    public FAQNotFoundException(String message) {
        super(message);
    }
}