package com.tify.back.dto.customerservice;

import com.tify.back.dto.gifthub.ImgDto;
import com.tify.back.dto.gifthub.ProductOptionDto;
import com.tify.back.model.customerservice.QnA;
import com.tify.back.model.gifthub.Product;
import com.tify.back.repository.users.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

import static org.hibernate.query.criteria.internal.ValueHandlerFactory.isNumeric;

@Getter
@Setter
public class QnADto {
    private Long userId;
    private String title;
    private String content;
    private int type;
    private String category;
    private MultipartFile[] files;
    public QnA toEntity(UserRepository userRepository) {
        QnA qna = new QnA();
        qna.setTitle(this.title);
        qna.setContent(this.content);
        qna.setType(this.type);
        qna.setUser(userRepository.findById(this.userId).orElse(null));
        return qna;
    }
}
