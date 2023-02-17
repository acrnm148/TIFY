package com.tify.back.repository.customerservice;


import com.tify.back.dto.gifthub.ProductSummary;
import com.tify.back.model.customerservice.QnA;
import com.tify.back.model.gifthub.Product;
import com.tify.back.model.users.User;
import com.tify.back.model.wish.Wish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnARepository extends JpaRepository<QnA, Long> {
    List<QnA> findAllByOrderByCreatedDateDesc(Pageable pageable);
    @Query("SELECT q FROM QnA q ORDER BY q.createdDate DESC")
    Page<QnA> pagingAll(Pageable pageable);
    Page<QnA> findAllByUser(User user, Pageable pageable);

    @Query("SELECT q FROM QnA q WHERE q.user.email LIKE %:search% OR q.title LIKE %:search%")
    Page<QnA> findByUserEmailContainingOrTitleContaining(String search , Pageable pageable);
}

