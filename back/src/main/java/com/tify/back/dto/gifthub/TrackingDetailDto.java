package com.tify.back.dto.gifthub;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.sound.midi.Track;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrackingDetailDto {
    private String transKind;
    private String level;
    private String transTelno;
    private String transTime;
    private String timeString;
    private String transWhere;
}
