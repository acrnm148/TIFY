package com.tify.back.model.wish;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWish is a Querydsl query type for Wish
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWish extends EntityPathBase<Wish> {

    private static final long serialVersionUID = -1014963173L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWish wish = new QWish("wish");

    public final StringPath addr1 = createString("addr1");

    public final StringPath addr2 = createString("addr2");

    public final StringPath cardImageCode = createString("cardImageCode");

    public final StringPath cardopen = createString("cardopen");

    public final StringPath Category = createString("Category");

    public final StringPath content = createString("content");

    public final DateTimePath<java.sql.Timestamp> createDate = createDateTime("createDate", java.sql.Timestamp.class);

    public final DatePath<java.util.Date> endDate = createDate("endDate", java.util.Date.class);

    public final StringPath finishYN = createString("finishYN");

    public final ListPath<com.tify.back.model.gifthub.Gift, com.tify.back.model.gifthub.QGift> giftItems = this.<com.tify.back.model.gifthub.Gift, com.tify.back.model.gifthub.QGift>createList("giftItems", com.tify.back.model.gifthub.Gift.class, com.tify.back.model.gifthub.QGift.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> joinCount = createNumber("joinCount", Integer.class);

    public final NumberPath<Integer> nowPrice = createNumber("nowPrice", Integer.class);

    public final DatePath<java.util.Date> startDate = createDate("startDate", java.util.Date.class);

    public final StringPath title = createString("title");

    public final NumberPath<Integer> totPrice = createNumber("totPrice", Integer.class);

    public final com.tify.back.model.users.QUser user;

    public final StringPath zipCode = createString("zipCode");

    public QWish(String variable) {
        this(Wish.class, forVariable(variable), INITS);
    }

    public QWish(Path<? extends Wish> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWish(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWish(PathMetadata metadata, PathInits inits) {
        this(Wish.class, metadata, inits);
    }

    public QWish(Class<? extends Wish> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.tify.back.model.users.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

