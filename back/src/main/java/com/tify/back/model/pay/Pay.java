package com.tify.back.model.pay;

import com.tify.back.model.gifthub.Gift;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "pay")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="pay_id")
    private Long pay_id;

    private String amount;
    private String celeb_img_url;
    private String celeb_from;
    private String celeb_tel;
    private String celeb_content;

    @Column(length = 3000)
    private String pay_type;

    @ManyToOne(fetch=LAZY)
    @JoinColumn(name="id") //변수명에 맞춰야함
    private Gift gift;

    private LocalDateTime createTime;
}
