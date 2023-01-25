package com.tify.back.repository.gifthub;

import com.tify.back.model.gifthub.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
//    @Query("SELECT ct FROM CartItem ct JOIN ct.cart cart WHERE cart = :cart")
//    List<ProductOptionDetail> findByProductAndOptionTitle(@Param("product") Product product, @Param("optionTitle") String optionTitle);
}
