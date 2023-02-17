package com.tify.back.repository.customerservice;


import com.tify.back.model.customerservice.FAQ;
import com.tify.back.model.customerservice.QnA;
import com.tify.back.model.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FAQRepository extends JpaRepository<FAQ, Long> {
    @Query("SELECT f FROM FAQ f ORDER BY f.createdDate DESC")
    Page<FAQ> pagingAll(Pageable pageable);
    Page<FAQ> findAllByType(int type, Pageable pageable);

    @Query("SELECT f FROM FAQ f WHERE f.title LIKE %:search% ORDER BY f.createdDate DESC")
    Page<FAQ> findFAQByTitle(@Param("search") String search, Pageable pageable);

}