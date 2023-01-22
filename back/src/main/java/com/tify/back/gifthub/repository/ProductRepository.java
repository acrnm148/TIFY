package com.tify.back.gifthub.repository;


import com.tify.back.gifthub.dto.ProductSummary;
import com.tify.back.gifthub.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Long> {
    Product findByName(String name);
    List<Product> findByPriceBetweenAndNameContainingAndCategory
            (int minPrice, int maxPrice, String name, Integer category);
    List<Product> findByPriceBetweenAndNameContaining
            (int minPrice, int maxPrice, String name);

    @Query("SELECT p FROM Product p ORDER BY p.likeCount DESC")
    List<ProductSummary> findAllProjectedBy();
}
