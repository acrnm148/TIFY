package com.tify.back.model.customerservice;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QFAQ is a Querydsl query type for FAQ
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFAQ extends EntityPathBase<FAQ> {

    private static final long serialVersionUID = 122447820L;

    public static final QFAQ fAQ = new QFAQ("fAQ");

    public final com.tify.back.common.QBaseEntity _super = new com.tify.back.common.QBaseEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> idx = createNumber("idx", Integer.class);

    public final StringPath imgUrl = createString("imgUrl");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath title = createString("title");

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public QFAQ(String variable) {
        super(FAQ.class, forVariable(variable));
    }

    public QFAQ(Path<? extends FAQ> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFAQ(PathMetadata metadata) {
        super(FAQ.class, metadata);
    }

}

