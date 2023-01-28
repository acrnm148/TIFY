package com.tify.back.repository.customerservice;


import com.tify.back.model.customerservice.QnA;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnARepository extends JpaRepository<QnA, Long> {
    List<QnA> findAllByOrderByCreatedDateDesc(Pageable pageable);
}

