package com.tify.back.model.gifthub;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tify.back.model.wish.Wish;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @JsonIgnore // json 할때 무시하고 json 생성, image에서 product는 mapping용이면 충분
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="wish_id") //OrderItem은 하나의 Order만 가진다. => order_id 매핑
    private Wish wish;

    @JsonIgnore
    @OneToOne(mappedBy = "gift")
    @JoinColumn(name = "order_id")
    private Order order;

//    @OneToMany
//    private List<Thank> thanks;

    private int quantity; // 수량
    //state
    @Column(name = "user_option")
    private String userOption;// json 형태
    private String type;
    private String finishYN;
    @Column(name = "max_amount")
    private Integer maxAmount;
    @Column(name = "pure_price")
    private int purePrice; // 상품 가격(수량 옵션)
    private int gathered; // 모인 돈
    private String successYN;
    private Integer idx;

    private LocalDateTime finishDate;
    private String giftImgUrl;
    private String giftUrl;

    @OneToMany(mappedBy= "gift")
    private List<GiftOption> giftOption = new ArrayList<>();
}
