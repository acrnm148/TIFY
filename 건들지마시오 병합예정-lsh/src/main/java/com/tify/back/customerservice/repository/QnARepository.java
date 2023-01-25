package com.tify.back.customerservice.repository;

import com.tify.back.customerservice.entity.QnA;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnARepository extends JpaRepository<QnA, Long> {
    List<QnA> findAllByOrderByCreatedDateDesc(Pageable pageable);
}

