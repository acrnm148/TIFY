package com.tify.back.gifthub.repository;


import com.tify.back.customerservice.entity.QnA;
import com.tify.back.gifthub.dto.ProductSummary;
import com.tify.back.gifthub.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Long> {
    Product findByName(String name);

    Page<Product> findAll(Pageable pageable);
    Page<Product> findByPriceBetweenAndNameContainingAndCategory
            (int minPrice, int maxPrice, String name, Integer category, Pageable pageable);
    Page<Product> findByPriceBetweenAndNameContaining
            (int minPrice, int maxPrice, String name, Pageable pageable);

    @Query("SELECT p FROM Product p ORDER BY p.likeCount DESC")
    List<ProductSummary> findAllProjectedBy();

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice AND p.name LIKE %:name%")
    List<Product> findByMyMethod(@Param("minPrice") int minPrice, @Param("maxPrice") int maxPrice, @Param("name") String name);


}
