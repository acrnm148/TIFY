package com.tify.back.customerservice.service;

import com.tify.back.customerservice.entity.QnA;
import com.tify.back.customerservice.repository.QnARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QnAService {
    private final QnARepository qnaRepository;

    public List<QnA> findAll() {
        return qnaRepository.findAllByOrderByCreatedDateDesc();
    }

    public QnA save(QnA qna) {
        return qnaRepository.save(qna);
    }

    public void delete(QnA qna) {
        qnaRepository.delete(qna);
    }

    public QnA findById(Long id) {
        return qnaRepository.findById(id).orElse(null);
    }
}