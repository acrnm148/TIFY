package com.tify.back.model.friend;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QFriend is a Querydsl query type for Friend
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFriend extends EntityPathBase<Friend> {

    private static final long serialVersionUID = 756739067L;

    public static final QFriend friend = new QFriend("friend");

    public final NumberPath<Long> friendId = createNumber("friendId", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<FriendStatus> status = createEnum("status", FriendStatus.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QFriend(String variable) {
        super(Friend.class, forVariable(variable));
    }

    public QFriend(Path<? extends Friend> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFriend(PathMetadata metadata) {
        super(Friend.class, metadata);
    }

}

