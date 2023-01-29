package com.tify.back.controller.customerservice;


import com.tify.back.exception.FAQNotFoundException;
import com.tify.back.model.customerservice.FAQ;
import com.tify.back.service.customerservice.FAQService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/faq")
public class FAQController {

    private final FAQService faqService;
    @GetMapping
    public List<FAQ> getFAQs() {
        return faqService.findAll();
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
        return faqService.save(existingFAQ);
    }
}
