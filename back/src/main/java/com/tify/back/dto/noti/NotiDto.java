package com.tify.back.dto.noti;

import com.tify.back.model.gifthub.Img;
import com.tify.back.model.noti.Noti;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotiDto {
    private String state;
    private String content;
    private String linkPath;
    private String reqeustPath;
    private String method;

    public Noti toEntity() {
        Noti noti = new Noti();
        noti.setState(this.state);
        noti.setContent(this.content);
        noti.setLinkPath(this.linkPath);
        noti.setReqeustPath(this.reqeustPath);
        noti.setMethod(this.method);

        return noti;
    }
}
