package com.tify.back.gifthub.controller;


import com.tify.back.gifthub.entity.Cart;
import com.tify.back.gifthub.entity.CartItem;
import com.tify.back.gifthub.repository.CartRepository;
import com.tify.back.gifthub.service.CartItemService;
import com.tify.back.gifthub.service.CartService;
import com.tify.back.gifthub.service.ImgService;
import com.tify.back.gifthub.service.ProductService;
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
    private final CartRepository cartRepository;

    //회원가입하면 생성되도록 해야함. (지금은 컨트롤러 없어서  일단 그냥 생성)
    @PostMapping("/create-empty-cart")
    public Cart cart(@RequestBody Cart cart) throws Exception {
        return cartService.saveCart(cart);
    }

    @PostMapping("/add-to-cart")
    public Cart addToCart(@RequestBody String message) throws Exception {
        return cartService.addCartItem(message);
    }
    // wish 생성창에서 장바구니에 있는 item 목록 요청시
    // cart 목록 들어갈 때, 진짜 아잍메 목록임.
    @GetMapping("/{id}/cartitems")
    public List<CartItem> getCartItems(@PathVariable Long id) throws Exception {
        return cartService.getCartById(id).getCartItems();
    }

    //단일 아이템 정보 detail (찜에서 바로 wish 생성시 사용)
    @GetMapping("/cartitem/{itemId}")
    public CartItem getCartItem(@PathVariable Long itemId) throws Exception {
        return cartItemService.getCartItemById(itemId);
    }

    @DeleteMapping("/{cartId}/delete-cart-item/{cartItemId}")
    public String deleteCartItem(@PathVariable Long cartId, @PathVariable Long cartItemId) throws Exception {
        cartService.deleteCartItem(cartId, cartItemId);
        return "delete success";
    }

    // 일단 cartId로 카트 조회.
    // cart 전체 정보
    @GetMapping("/cart/{cartId}")
    public Cart getCart(@PathVariable Long cartId) throws Exception {
        return cartRepository.findById(cartId).get();
    }
}
