package com.tify.back.model.wish;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QJoinedWish is a Querydsl query type for JoinedWish
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QJoinedWish extends EntityPathBase<JoinedWish> {

    private static final long serialVersionUID = -1223988220L;

    public static final QJoinedWish joinedWish = new QJoinedWish("joinedWish");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> payId = createNumber("payId", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public final NumberPath<Long> wishId = createNumber("wishId", Long.class);

    public QJoinedWish(String variable) {
        super(JoinedWish.class, forVariable(variable));
    }

    public QJoinedWish(Path<? extends JoinedWish> path) {
        super(path.getType(), path.getMetadata());
    }

    public QJoinedWish(PathMetadata metadata) {
        super(JoinedWish.class, metadata);
    }

}

