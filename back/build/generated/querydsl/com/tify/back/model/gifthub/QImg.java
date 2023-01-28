package com.tify.back.model.gifthub;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QImg is a Querydsl query type for Img
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QImg extends EntityPathBase<Img> {

    private static final long serialVersionUID = 511310631L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QImg img = new QImg("img");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> idx = createNumber("idx", Integer.class);

    public final QProduct product;

    public final StringPath url = createString("url");

    public QImg(String variable) {
        this(Img.class, forVariable(variable), INITS);
    }

    public QImg(Path<? extends Img> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QImg(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QImg(PathMetadata metadata, PathInits inits) {
        this(Img.class, metadata, inits);
    }

    public QImg(Class<? extends Img> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.product = inits.isInitialized("product") ? new QProduct(forProperty("product")) : null;
    }

}

