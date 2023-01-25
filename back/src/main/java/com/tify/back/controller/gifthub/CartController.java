package com.tify.back.controller.gifthub;



import com.tify.back.model.gifthub.Cart;
import com.tify.back.model.gifthub.CartItem;
import com.tify.back.repository.gifthub.CartRepository;
import com.tify.back.service.gifthub.CartItemService;
import com.tify.back.service.gifthub.CartService;
import com.tify.back.service.gifthub.ImgService;
import com.tify.back.service.gifthub.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final ProductService productService;
    private final ImgService imgService;
    private final CartService cartService;
    private final CartItemService cartItemService;
    private final CartRepository cartRepository;

    //회원가입하면 생성되도록 해야함. (지금은 컨트롤러 없어서  일단 그냥 생성)
    @PostMapping
    public Cart cart(@RequestBody Cart cart) throws Exception {
        return cartService.saveCart(cart);
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestBody String message) throws Exception {
        return cartService.addCartItem(message);
    }
    // wish 생성창에서 장바구니에 있는 item 목록 요청시
    // cart 목록 들어갈 때, 진짜 아잍메 목록임.
    @GetMapping("/{id}/list")
    public List<CartItem> getCartItems(@PathVariable Long id) throws Exception {
        return cartService.getCartById(id).getCartItems();
    }

    //단일 아이템 정보 detail (찜에서 바로 wish 생성시 사용)
    //Wish 에서 gift 선택시나, gift 바로 생성시에도 이 정보 전달.
    //cart에 있던것으로 wish 생성시 cart에서 삭제 ?
    @GetMapping("/cartitem/{itemId}")
    public CartItem getCartItem(@PathVariable Long itemId) throws Exception {
        return cartItemService.getCartItemById(itemId);
    }

    @DeleteMapping("/cartitem/{cartItemId}")
    public String deleteCartItem(@PathVariable Long cartItemId) throws Exception {
        CartItem cartItem = cartItemService.getCartItemById(cartItemId);
        Long cartId = cartItem.getCart().getId();
        cartService.deleteItemInCart(cartId, cartItemId);
        return "delete success";
    }

    @DeleteMapping("/{cartId}")
    public String deleteCart(@PathVariable Long cartId) throws Exception {
        cartService.deleteCart(cartId);
        return "delete success";
    }

    // 일단 cartId로 카트 조회.
    // cart 전체 정보
    @GetMapping("/{cartId}")
    public Cart getCart(@PathVariable Long cartId) throws Exception {
        return cartRepository.findById(cartId).get();
    }
}
