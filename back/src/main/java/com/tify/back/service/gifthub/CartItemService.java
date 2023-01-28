package com.tify.back.service.gifthub;



import com.tify.back.model.gifthub.Cart;
import com.tify.back.model.gifthub.CartItem;
import com.tify.back.model.gifthub.Product;
import com.tify.back.repository.gifthub.CartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;
    public CartItem saveCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }
    @Transactional
    public CartItem createCartItem(Product product, Cart cart, Integer quantity, String options) {
        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setCart(cart);
        cartItem.setQuantity(quantity);
        cartItem.setOptions(options);
        product.setLikeCount(product.getLikeCount() + 1);
        productService.saveProduct(product);
        return cartItemRepository.save(cartItem);
    }


//    public List<Cart> saveCarts(List<Cart> carts) {
//        return cartRepository.saveAll(carts);
//    }
//
//    public List<CartItem> getCartItems() {
//        return cartItemRepository.findAll();
//    }

    public CartItem getCartItemById(Long id) {
        return cartItemRepository.findById(id).orElse(null);
    }
    public String deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
        return "Item removed !!" + id;
    }

}
