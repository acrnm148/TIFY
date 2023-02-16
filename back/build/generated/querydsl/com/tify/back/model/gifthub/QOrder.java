package com.tify.back.model.gifthub;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOrder is a Querydsl query type for Order
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOrder extends EntityPathBase<Order> {

    private static final long serialVersionUID = 1748935090L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOrder order = new QOrder("order1");

    public final StringPath createdDt = createString("createdDt");

    public final DateTimePath<java.time.LocalDateTime> createdTime = createDateTime("createdTime", java.time.LocalDateTime.class);

    public final StringPath deliveryNumber = createString("deliveryNumber");

    public final NumberPath<Integer> gatheredPrice = createNumber("gatheredPrice", Integer.class);

    public final QGift gift;

    public final NumberPath<Long> gift_gift_id = createNumber("gift_gift_id", Long.class);

    public final NumberPath<Long> gift_product_id = createNumber("gift_product_id", Long.class);

    public final StringPath giftImgUrl = createString("giftImgUrl");

    public final StringPath giftName = createString("giftName");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> orderPrice = createNumber("orderPrice", Integer.class);

    public final StringPath refState = createString("refState");

    public final StringPath refUserAccount = createString("refUserAccount");

    public final StringPath refUserBank = createString("refUserBank");

    public final StringPath refUserName = createString("refUserName");

    public final NumberPath<Integer> state = createNumber("state", Integer.class);

    public final StringPath tel = createString("tel");

    public final com.tify.back.model.users.QUser user;

    public final StringPath userOption = createString("userOption");

    public final StringPath wishFinishDate = createString("wishFinishDate");

    public final NumberPath<Long> wishId = createNumber("wishId", Long.class);

    public final StringPath wishName = createString("wishName");

    public QOrder(String variable) {
        this(Order.class, forVariable(variable), INITS);
    }

    public QOrder(Path<? extends Order> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOrder(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOrder(PathMetadata metadata, PathInits inits) {
        this(Order.class, metadata, inits);
    }

    public QOrder(Class<? extends Order> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.gift = inits.isInitialized("gift") ? new QGift(forProperty("gift"), inits.get("gift")) : null;
        this.user = inits.isInitialized("user") ? new com.tify.back.model.users.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

