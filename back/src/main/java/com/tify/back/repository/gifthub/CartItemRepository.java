package com.tify.back.repository.gifthub;

import com.tify.back.dto.gifthub.CartPageRequest;
import com.tify.back.model.gifthub.Cart;
import com.tify.back.model.gifthub.CartItem;
import com.tify.back.model.gifthub.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
//    @Query("SELECT ct FROM CartItem ct JOIN ct.cart cart WHERE cart = :cart")
//    List<ProductOptionDetail> findByProductAndOptionTitle(@Param("product") Product product, @Param("optionTitle") String optionTitle);
//    @Query("SELECT p FROM Product p ORDER BY p.likeCount DESC")
//    List<ProductSummary> findAllProjectedBy();
    Page<CartItem> findByCart_Id(Long cart_Id, CartPageRequest pageable);
    CartItem findByProductAndOptionsAndCart(Product product, String options, Cart cart);
}
