package com.tify.back.dto.users.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UdatePwRequestDto {
    private String nowPw;
    private String newPw;
}
