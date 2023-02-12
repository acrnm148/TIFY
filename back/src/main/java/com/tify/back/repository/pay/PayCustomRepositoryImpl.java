package com.tify.back.repository.pay;

import com.querydsl.core.types.Expression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.pay.Pay;
import com.tify.back.model.pay.QPay;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Slf4j
public class PayCustomRepositoryImpl implements PayCustomRepository {

    JPAQueryFactory jpaQueryFactory;

    public PayCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    public List<Pay> findMyPayListByGiftId(Gift gift, Long userId) {
        log.info("{},{}", gift, userId);

        List<Pay> payList = jpaQueryFactory
                .selectFrom(QPay.pay)
                .where(QPay.pay.gift.eq(gift),
                        QPay.pay.userId.eq(userId))
                .fetch();
        return payList;
    }

    public List<Pay> findMyPayListByWishId(Long wishId, Long userId) {
        log.info("{},{}", wishId, userId);

        List<Pay> payList = jpaQueryFactory
                .selectFrom(QPay.pay)
                .where(QPay.pay.wishId.eq(wishId),
                        QPay.pay.userId.eq(userId))
                .fetch();
        return payList;
    }
}
