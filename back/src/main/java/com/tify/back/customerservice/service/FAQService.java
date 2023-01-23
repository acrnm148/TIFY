package com.tify.back.customerservice.service;

import com.tify.back.customerservice.entity.FAQ;
import com.tify.back.customerservice.repository.FAQRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FAQService {
    private final FAQRepository faqRepository;

    public FAQ save(FAQ faq) {return faqRepository.save(faq);}

    public Optional<FAQ> findById(Long id) {return faqRepository.findById(id);}

    public List<FAQ> findAll() {return faqRepository.findAll();}

    public String deleteById(Long id) { faqRepository.deleteById(id); return "Deleted";}

}
