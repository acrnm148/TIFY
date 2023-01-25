package com.tify.back.customerservice.repository;

import com.tify.back.customerservice.entity.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FAQRepository extends JpaRepository<FAQ, Long> {
}