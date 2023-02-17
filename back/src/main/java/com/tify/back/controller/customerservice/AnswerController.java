package com.tify.back.controller.customerservice;


import com.tify.back.exception.FAQNotFoundException;
import com.tify.back.model.customerservice.Answer;
import com.tify.back.model.customerservice.FAQ;
import com.tify.back.model.customerservice.QnA;
import com.tify.back.repository.customerservice.AnswerRepository;
import com.tify.back.service.customerservice.FAQService;
import com.tify.back.service.customerservice.QnAService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/answer")
public class AnswerController {

    private final AnswerRepository answerRepository;
    private final QnAService qnAService;

    // 어차피 answer는 딸려옴. 추가만 하자.
    // 싸피 1대1 문의 보면 수정,삭제 같은거 없음.
    @PostMapping(value ="/{qnaId}")
    public Answer registerAnswer(@RequestBody Answer answer,@PathVariable("qnaId") Long qnaId){
        QnA qna = qnAService.findById(qnaId);
        answer.setQna(qna);
        List<Answer> answerList = qna.getAnswers();
        answerList.add(answer);
        qna.setAnswers(answerList);
        qnAService.save(qna);
        return answerRepository.save(answer);
    }
    @DeleteMapping(value ="/{answerId}")
    public String deleteAnswer(@PathVariable("answerId") Long answerId) {
        answerRepository.deleteById(answerId);
        return "answer" + answerId.toString() + "successfully deleted";
    }
}
