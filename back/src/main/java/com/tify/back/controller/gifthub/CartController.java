package com.tify.back.controller.gifthub;



import com.tify.back.dto.gifthub.CartPageRequest;
import com.tify.back.exception.DontHaveException;
import com.tify.back.model.gifthub.Cart;
import com.tify.back.model.gifthub.CartItem;
import com.tify.back.repository.gifthub.CartItemRepository;
import com.tify.back.repository.gifthub.CartRepository;
import com.tify.back.service.gifthub.CartItemService;
import com.tify.back.service.gifthub.CartService;
import com.tify.back.service.gifthub.ImgService;
import com.tify.back.service.gifthub.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final ProductService productService;
    private final ImgService imgService;
    private final CartService cartService;
    private final CartItemService cartItemService;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    //회원가입하면 생성되도록 해야함. (지금은 컨트롤러 없어서  일단 그냥 생성)
    @PostMapping("/test")
    public Cart cart(@RequestBody Cart cart) throws Exception {
        return cartService.saveCart(cart);
    }

    @Operation(summary = "cart item add", description = "장바구니에 추가")
    @PostMapping
    public CartItem addToCart(@RequestBody String message) throws Exception {
        return cartService.addCartItem(message);
    }
    // wish 생성창에서 장바구니에 있는 item 목록 요청시
    // cart 목록 들어갈 때, 진짜 아잍메 목록임.
    @Operation(summary = "user의 장바구니 아이템 목록", description = "장바구니 아이템 목록, 등록된 아이템 수량, 총 가격 정보 포함.")
    @GetMapping("/list/{userId}")
    public Page<CartItem> getCartItems(@PathVariable Long userId,
                                       @RequestParam(value = "page", required = false) Integer page,
                                       @RequestParam(value = "max_result", required = false) Integer max_result) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Cart cart = cartRepository.findByUserId(userId);
        int cart_total_price = cart.getPrice();
        int cart_total_quantity = cart.getQuantity();
        CartPageRequest pageable = new CartPageRequest(page, max_result, Sort.unsorted(), cart_total_price, cart_total_quantity);
//                CustomPageRequest.of(page, Math.max(10, max_result));

        Long cart_Id = cartRepository.findByUserId(userId).getId();
        return cartItemRepository.findByCart_Id(cart_Id,pageable);
    }

    //단일 아이템 정보 detail (찜에서 바로 wish 생성시 사용)
    //Wish 에서 gift 선택시나, gift 바로 생성시에도 이 정보 전달.
    //cart에 있던것으로 wish 생성시 cart에서 삭제 ?
    @Operation(summary = "유저 장바구니 속 아이템 조회", description = "유저 장바구니 속 아이템 조회")
    @GetMapping("/{userId}/{cartItemId}")
    public CartItem getCartItem(@PathVariable Long userId, @PathVariable Long cartItemId) throws Exception {
        CartItem cartItem = cartItemService.getCartItemById(cartItemId);
        try {
            Boolean check = userId.equals(cartItem.getCart().getUser().getId());
            return cartItemService.getCartItemById(cartItemId);
        } catch (Exception e) {
            throw new DontHaveException("You don't have this Item");
        }
    }

    @Operation(summary = "유저 장바구니 속 아이템 삭제", description = "유저 장바구니 속 아이템 삭제")
    @DeleteMapping("/{userId}/{cartItemId}")
    public String deleteCartItem(@PathVariable Long userId, @PathVariable Long cartItemId) throws Exception {
        CartItem cartItem = cartItemService.getCartItemById(cartItemId);
        Long cartId = cartItem.getCart().getId();
        cartService.deleteItemInCart(cartId, cartItemId);
        return "delete success";
    }

    // user 삭제시 카트 삭제
//    @DeleteMapping("/{cartId}")
//    public String deleteCart(@PathVariable Long cartId) throws Exception {
//        cartService.deleteCart(cartId);
//        return "delete success";
//    }

    // 일단 cartId로 카트 조회.
    // cart 전체 정보
    @Operation(summary = "유저 장바구니 요약 정보", description = "유저 장바구니 요약 정보")
    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable Long userId) throws Exception {
        return cartRepository.findByUserId(userId);
    }

    @Operation(summary = "wish 생성시 불러올 찜 목록", description = "wish 생성시 찜목록")
    @GetMapping("/forwish/{userId}")
    public List<CartItem> getCartForWish(@PathVariable Long userId) throws Exception {
        return cartRepository.findByUserId(userId).getCartItems();
    }

    @PostMapping("/check-already")
    public Boolean check(@RequestBody Map<String,Long> map) throws Exception {
        Cart cart = cartRepository.findByUserId(map.get("userId"));
        for (CartItem cartItem : cart.getCartItems()) {
            if (cartItem.getProduct().getId().equals(map.get("productId")) ) {
                return true;
            }
        }
        return false;
    }

    @Operation(summary = "유저 장바구니 속 아이템 삭제", description = "유저 장바구니 속 아이템 삭제")
    @Transactional
    @DeleteMapping
    public String deleteCartItem(@RequestBody Map<String,Long> map) throws Exception {
        Cart cart = cartRepository.findByUserId(map.get("userId"));
        List<CartItem> items = cart.getCartItems();
        try {
            items = items.stream()
                    .filter(val -> {
                        if (val.getProduct().getId().equals(map.get("productId"))) {
                            try {
                                cartService.deleteItemInCart(cart.getId(), val.getId());
                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                            return false;
                        }
                        return true;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            items = new ArrayList<>();
        }
        cart.setCartItems(items);
        cartRepository.save(cart);
        return "delete success";
    }
}