package com.tify.back.dto.noti;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class FromFrontRequestDTO {
    String messageType; // sms (short <70자) , lms
    List<MessageDTO> messageList;
}
