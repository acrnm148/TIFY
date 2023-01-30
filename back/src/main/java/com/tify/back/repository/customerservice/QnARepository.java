package com.tify.back.repository.customerservice;


import com.tify.back.model.customerservice.QnA;
import com.tify.back.model.wish.Wish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnARepository extends JpaRepository<QnA, Long> {
    List<QnA> findAllByOrderByCreatedDateDesc(Pageable pageable);
    @Query("SELECT q FROM QnA q ORDER BY q.createdDate DESC")
    Page<QnA> pagingAll(Pageable pageable);
}

