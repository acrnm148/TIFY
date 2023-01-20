package com.javatechie.crud.example.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javatechie.crud.example.entity.Cart;
import com.javatechie.crud.example.entity.CartItem;
import com.javatechie.crud.example.entity.Img;
import com.javatechie.crud.example.entity.Product;
import com.javatechie.crud.example.repository.CartRepository;
import com.javatechie.crud.example.repository.ImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final ProductService productService;
    private final CartItemService cartItemService;
    ObjectMapper objectMapper = new ObjectMapper();

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

//    public List<Cart> saveCarts(List<Cart> carts) {
//        return cartRepository.saveAll(carts);
//    }
//
//    public List<Cart> getCarts() {
//        return cartRepository.findAll();
//    }

    public Cart getCartById(int id) {
        return cartRepository.findById(id).orElse(null);
    }
    public String deleteCart(int id) {
        cartRepository.deleteById(id);
        return "img removed !!" + id;
    }

    public Cart addCartItem(String message) throws Exception {
        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String,String>>() {};
        Map<String, String> map = objectMapper.readValue(message, typeReference);
        Cart cart =  getCartById(Integer.parseInt(map.get("cartId")));
        Product product = productService.getProductById(Integer.parseInt(map.get("productId")));
        CartItem cartItem = cartItemService.createCartItem(product, cart, Integer.parseInt(map.get("quantity")));
        List<CartItem> cartItems = cart.getCartItems();
        Integer price = cartItem.getProduct().getPrice();
        Integer total = cart.getPrice();
        cartItems.add(cartItem);
        cart.setPrice(total + price);
        cart.setQuantity(cart.getQuantity() + 1);
        cart.setCartItems(cartItems);
        return saveCart(cart);
    }
}
