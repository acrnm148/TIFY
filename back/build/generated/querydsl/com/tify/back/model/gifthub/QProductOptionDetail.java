package com.tify.back.model.gifthub;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProductOptionDetail is a Querydsl query type for ProductOptionDetail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProductOptionDetail extends EntityPathBase<ProductOptionDetail> {

    private static final long serialVersionUID = -1110184167L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProductOptionDetail productOptionDetail = new QProductOptionDetail("productOptionDetail");

    public final StringPath content = createString("content");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> idx = createNumber("idx", Integer.class);

    public final QProductOption productOption;

    public final NumberPath<Integer> value = createNumber("value", Integer.class);

    public QProductOptionDetail(String variable) {
        this(ProductOptionDetail.class, forVariable(variable), INITS);
    }

    public QProductOptionDetail(Path<? extends ProductOptionDetail> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProductOptionDetail(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProductOptionDetail(PathMetadata metadata, PathInits inits) {
        this(ProductOptionDetail.class, metadata, inits);
    }

    public QProductOptionDetail(Class<? extends ProductOptionDetail> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.productOption = inits.isInitialized("productOption") ? new QProductOption(forProperty("productOption"), inits.get("productOption")) : null;
    }

}

