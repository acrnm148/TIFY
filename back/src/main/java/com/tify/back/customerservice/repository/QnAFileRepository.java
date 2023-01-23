package com.tify.back.customerservice.repository;

import com.tify.back.customerservice.entity.QnA;
import com.tify.back.customerservice.entity.QnAFile;
import com.tify.back.gifthub.entity.Product;
import com.tify.back.gifthub.entity.ProductOptionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnAFileRepository extends JpaRepository<QnAFile, Long> {
//    QnAFile findByFileName(String uuid);
    @Query("SELECT qf FROM QnAFile qf JOIN qf.qna qna  WHERE qna.id = :id")
    List<QnAFile> findByQnAId(@Param("id") Long id);
}
