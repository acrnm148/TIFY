package com.tify.back.dto.noti;

import lombok.*;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class MessageDTO {
    String to;
    String content;
    String subject;
    List<Map<String,String>> files;
}
