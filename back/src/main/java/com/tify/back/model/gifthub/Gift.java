package com.tify.back.model.gifthub;

import com.fasterxml.jackson.annotation.JsonIgnore;
<<<<<<< HEAD:back/src/main/java/com/tify/back/model/gifthub/Gift.java
import com.tify.back.model.wish.Wish;
=======
import com.tify.back.wish.entity.Wish;
>>>>>>> 1687efce5b9f2b654e3e374326a0e2ba6ad7ede9:back/src/main/java/com/tify/back/gifthub/entity/Gift.java
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "gift")
public class Gift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gift_id")
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @JsonIgnore // json 할때 무시하고 json 생성, image에서 product는 mapping용이면 충분
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="wish_id") //OrderItem은 하나의 Order만 가진다. => order_id 매핑
    private Wish wish;

    private int quantity; // 수량
    private String options; // json 형태

    //state

    private String user_option;
    private String type;
    private String finishYN;
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @Column(name = "max_amount")
    private Integer maxAmount;

    @Column(name = "price")
    private int purePrice; // 상품 가격(수량 옵션)

    private String successYN;

    private String addr1;
    private String addr2;
    private String zipCode;

    private Integer idx;
}
