package com.tify.back.model.gifthub;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="gift_option")
public class GiftOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="gift_opt_id")
    private Long giftOptId;

    @ManyToOne
    @JoinColumn(name = "id")
    private Gift gift;

    @Column(length=1000)
    private String giftOpt;

}
