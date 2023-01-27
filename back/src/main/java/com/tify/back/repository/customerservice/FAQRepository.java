package com.tify.back.repository.customerservice;


import com.tify.back.model.customerservice.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FAQRepository extends JpaRepository<FAQ, Long> {
}