package com.tify.back.model.customerservice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tify.back.common.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "qna_file")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Builder
public class QnAFile extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "qna_id")
    private QnA qna;

    private String originName;
    @Column(name="FILE_TEMP_NM")
    private String fileName;
    @Column(name="FILE_SIZE")
    private long fileSize;
    @Column(name="FILE_EXT")
    private String fileContentType;
    @Column(name="FILE_PATH")
    private String filePath;
}
