package com.tify.back.dto.wish;

import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.pay.Pay;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
public class JoinedWishDto {
    private Long joinedWishId;
    private Long wishId;
    private Long userId;
    //private Pay pay;

    private String wishCategory;
    private String wishName;
    private String wishUser;
    private Long wishUserId;
    private String wishFinishYN;
    private Date wishEndDate;

    private List<CelebCardDto> celebCardDtoList;
    private List<MyCelebDto> myCelebDtoList;
}
