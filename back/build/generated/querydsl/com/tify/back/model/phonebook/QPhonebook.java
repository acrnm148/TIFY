package com.tify.back.model.phonebook;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QPhonebook is a Querydsl query type for Phonebook
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPhonebook extends EntityPathBase<Phonebook> {

    private static final long serialVersionUID = -1034512499L;

    public static final QPhonebook phonebook = new QPhonebook("phonebook");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> myId = createNumber("myId", Long.class);

    public final StringPath name = createString("name");

    public final StringPath phoneNumber = createString("phoneNumber");

    public QPhonebook(String variable) {
        super(Phonebook.class, forVariable(variable));
    }

    public QPhonebook(Path<? extends Phonebook> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPhonebook(PathMetadata metadata) {
        super(Phonebook.class, metadata);
    }

}

