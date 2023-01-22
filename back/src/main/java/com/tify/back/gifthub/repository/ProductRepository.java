package com.tify.back.gifthub.repository;


import com.tify.back.gifthub.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository  extends JpaRepository<Product, Long> {
    Product findByName(String name);
    List<Product> findByPriceBetweenAndNameContainingAndCategory
            (int minPrice, int maxPrice, String name, Integer category);
    List<Product> findByPriceBetweenAndNameContaining
            (int minPrice, int maxPrice, String name);
}
