package com.tify.back.dto.users.response;

public class DataResponseDto {
    private int code;
    private String message;

    public DataResponseDto(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
