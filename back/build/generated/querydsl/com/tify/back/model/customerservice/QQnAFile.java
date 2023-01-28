package com.tify.back.model.customerservice;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQnAFile is a Querydsl query type for QnAFile
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQnAFile extends EntityPathBase<QnAFile> {

    private static final long serialVersionUID = -907398378L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQnAFile qnAFile = new QQnAFile("qnAFile");

    public final com.tify.back.common.QBaseEntity _super = new com.tify.back.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath fileContentType = createString("fileContentType");

    public final StringPath fileName = createString("fileName");

    public final StringPath filePath = createString("filePath");

    public final NumberPath<Long> fileSize = createNumber("fileSize", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedDate = _super.modifiedDate;

    public final StringPath originName = createString("originName");

    public final QQnA qna;

    public QQnAFile(String variable) {
        this(QnAFile.class, forVariable(variable), INITS);
    }

    public QQnAFile(Path<? extends QnAFile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQnAFile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQnAFile(PathMetadata metadata, PathInits inits) {
        this(QnAFile.class, metadata, inits);
    }

    public QQnAFile(Class<? extends QnAFile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.qna = inits.isInitialized("qna") ? new QQnA(forProperty("qna"), inits.get("qna")) : null;
    }

}

