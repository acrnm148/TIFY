package com.tify.back.gifthub.repository;

import com.tify.back.gifthub.entity.CartItem;
import com.tify.back.gifthub.entity.Product;
import com.tify.back.gifthub.entity.ProductOptionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
//    @Query("SELECT ct FROM CartItem ct JOIN ct.cart cart WHERE cart = :cart")
//    List<ProductOptionDetail> findByProductAndOptionTitle(@Param("product") Product product, @Param("optionTitle") String optionTitle);
}
