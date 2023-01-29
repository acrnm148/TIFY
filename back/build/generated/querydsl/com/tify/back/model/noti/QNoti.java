package com.tify.back.model.noti;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNoti is a Querydsl query type for Noti
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNoti extends EntityPathBase<Noti> {

    private static final long serialVersionUID = 855055739L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNoti noti = new QNoti("noti");

    public final com.tify.back.common.QBaseEntity _super = new com.tify.back.common.QBaseEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath linkPath = createString("linkPath");

    public final StringPath method = createString("method");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath reqeustPath = createString("reqeustPath");

    public final StringPath state = createString("state");

    public final com.tify.back.model.users.QUser user;

    public QNoti(String variable) {
        this(Noti.class, forVariable(variable), INITS);
    }

    public QNoti(Path<? extends Noti> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNoti(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNoti(PathMetadata metadata, PathInits inits) {
        this(Noti.class, metadata, inits);
    }

    public QNoti(Class<? extends Noti> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.tify.back.model.users.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

