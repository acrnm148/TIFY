package com.javatechie.crud.example.controller;


import com.javatechie.crud.example.common.CartDTO;
import com.javatechie.crud.example.entity.Cart;
import com.javatechie.crud.example.entity.CartItem;
import com.javatechie.crud.example.entity.Product;
import com.javatechie.crud.example.service.CartItemService;
import com.javatechie.crud.example.service.CartService;
import com.javatechie.crud.example.service.ImgService;
import com.javatechie.crud.example.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final ProductService productService;
    private final ImgService imgService;
    private final CartService cartService;
    private final CartItemService cartItemService;

    @PostMapping("/create-empty-cart")
    public Cart cart(@RequestBody Cart cart) throws Exception {
        return cartService.saveCart(cart);
    }

    @PostMapping("/add-to-cart")
    public Cart addToCart(@RequestBody String message) throws Exception {
        return cartService.addCartItem(message);
    }
    @PostMapping("/cartitem")
    // wish 생성창에서 장바구니에 있는 item 목록 요청시
    // cart 목록 들어갈 때
    @GetMapping("/cartitems/{id}")
    public List<CartItem> getCartItems(@PathVariable int id) throws Exception {
        return cartService.getCartById(id).getCartItems();
    }
}
