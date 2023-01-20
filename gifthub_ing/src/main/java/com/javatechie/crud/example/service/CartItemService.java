package com.javatechie.crud.example.service;

import com.javatechie.crud.example.entity.Cart;
import com.javatechie.crud.example.entity.CartItem;
import com.javatechie.crud.example.entity.Product;
import com.javatechie.crud.example.repository.CartItemRepository;
import com.javatechie.crud.example.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;
    public CartItem saveCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }
    @Transactional
    public CartItem createCartItem(Product product, Cart cart, Integer quantity) {
        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setCart(cart);
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

    public CartItem getCartItemById(int id) {
        return cartItemRepository.findById(id).orElse(null);
    }
    public String deleteCartItem(int id) {
        cartItemRepository.deleteById(id);
        return "Item removed !!" + id;
    }

}
