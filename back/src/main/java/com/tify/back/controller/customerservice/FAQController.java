package com.tify.back.controller.customerservice;


import com.tify.back.exception.FAQNotFoundException;
import com.tify.back.model.customerservice.FAQ;
import com.tify.back.model.customerservice.QnA;
import com.tify.back.repository.customerservice.FAQRepository;
import com.tify.back.service.customerservice.FAQService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/faq")
public class FAQController {

    private final FAQService faqService;
    private final FAQRepository faqRepository;
    @GetMapping
    public Page<FAQ> getFAQs(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "max_result", required = false) Integer max_result) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result), Sort.by("createdDate").descending());
        return faqRepository.pagingAll(pageable);
    }

    @GetMapping("/search/{type}")
    public Page<FAQ> searchFAQs(@RequestParam(value = "page", required = false) Integer page,
                             @RequestParam(value = "max_result", required = false) Integer max_result,
                            @PathVariable("type") int type) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result), Sort.by("createdDate").descending());
        return faqRepository.findAllByType(type, pageable);
    }

    @GetMapping(value ="/{id}")
    public FAQ getFAQ(@PathVariable Long id) {
        return faqService.findById(id).orElseThrow(() -> new FAQNotFoundException("FAQ with id " + id + " not found"));
    }
    @PostMapping
    public FAQ addFAQ(@RequestBody FAQ faq) {
        return faqService.save(faq);
    }

    @DeleteMapping(value ="/{id}")
    public String deleteFAQ(@PathVariable Long id) {
        try {
            return faqService.deleteById(id);
        } catch (Exception e) {
            throw new FAQNotFoundException("FAQ with id " + id + " not found");
        }
    }
    //requestbody 쓰면 form data 오류걸림
    @PutMapping(value ="/{id}")
    public FAQ updateFAQ(@PathVariable Long id,@RequestBody FAQ faq) {
        FAQ existingFAQ = faqService.findById(id).orElseThrow(() -> new FAQNotFoundException("FAQ with id " + id + " not found"));
        existingFAQ.setContent(faq.getContent());
        existingFAQ.setIdx(faq.getIdx());
        existingFAQ.setTitle(faq.getTitle());
        existingFAQ.setType(faq.getType());
        existingFAQ.setImgUrl(faq.getImgUrl());
        return faqService.save(existingFAQ);
    }
}
