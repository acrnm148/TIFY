package com.tify.back.service.customerservice;


import com.tify.back.exception.QNANotFoundException;
import com.tify.back.model.customerservice.QnA;
import com.tify.back.repository.customerservice.QnARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QnAService {
    private final QnARepository qnaRepository;

    public List<QnA> findAll(Pageable pageable) {
        return qnaRepository.findAllByOrderByCreatedDateDesc(pageable);
    }

    public List<QnA> RfindAll() {
        return qnaRepository.findAll();
    }

    public QnA save(QnA qna) {
        return qnaRepository.save(qna);
    }

    public void delete(QnA qna) {
        qnaRepository.delete(qna);
    }

    public QnA findById(Long id) {
        return qnaRepository.findById(id).orElseThrow(() -> new QNANotFoundException("QNA with id " + id + " not found"));
    }
}