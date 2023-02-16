package com.tify.back.model.gifthub;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGift is a Querydsl query type for Gift
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGift extends EntityPathBase<Gift> {

    private static final long serialVersionUID = -1329302964L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGift gift = new QGift("gift");

    public final DateTimePath<java.time.LocalDateTime> finishDate = createDateTime("finishDate", java.time.LocalDateTime.class);

    public final StringPath finishYN = createString("finishYN");

    public final NumberPath<Integer> gathered = createNumber("gathered", Integer.class);

    public final StringPath giftImgUrl = createString("giftImgUrl");

    public final StringPath giftname = createString("giftname");

    public final StringPath giftUrl = createString("giftUrl");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> idx = createNumber("idx", Integer.class);

    public final NumberPath<Integer> maxAmount = createNumber("maxAmount", Integer.class);

    public final QOrder order;

    public final ListPath<com.tify.back.model.pay.Pay, com.tify.back.model.pay.QPay> payList = this.<com.tify.back.model.pay.Pay, com.tify.back.model.pay.QPay>createList("payList", com.tify.back.model.pay.Pay.class, com.tify.back.model.pay.QPay.class, PathInits.DIRECT2);

    public final NumberPath<Long> productId = createNumber("productId", Long.class);

    public final NumberPath<Integer> purePrice = createNumber("purePrice", Integer.class);

    public final NumberPath<Integer> quantity = createNumber("quantity", Integer.class);

    public final StringPath successYN = createString("successYN");

    public final StringPath type = createString("type");

    public final StringPath userOption = createString("userOption");

    public final com.tify.back.model.wish.QWish wish;

    public QGift(String variable) {
        this(Gift.class, forVariable(variable), INITS);
    }

    public QGift(Path<? extends Gift> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGift(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGift(PathMetadata metadata, PathInits inits) {
        this(Gift.class, metadata, inits);
    }

    public QGift(Class<? extends Gift> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.order = inits.isInitialized("order") ? new QOrder(forProperty("order"), inits.get("order")) : null;
        this.wish = inits.isInitialized("wish") ? new com.tify.back.model.wish.QWish(forProperty("wish"), inits.get("wish")) : null;
    }

}

