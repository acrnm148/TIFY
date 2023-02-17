package com.tify.back.service.gifthub;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


import com.tify.back.exception.AlreadyExistException;
import com.tify.back.model.gifthub.Cart;
import com.tify.back.model.gifthub.CartItem;
import com.tify.back.model.gifthub.Product;
import com.tify.back.model.gifthub.ProductOptionDetail;
import com.tify.back.repository.gifthub.CartItemRepository;
import com.tify.back.repository.gifthub.CartRepository;
import com.tify.back.repository.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {
    private final CartRepository cartRepository;
    private final ProductService productService;
    private final CartItemService cartItemService;
    private final ProductOptionDetailService productOptionDetailService;
    ObjectMapper objectMapper = new ObjectMapper();
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

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

    public Cart getCartById(Long id) {
        return cartRepository.findById(id).orElse(null);
    }

    //회원가입 컨트롤러 생기면 user id 또는 cart id 로 cart 탐색 변경
    public CartItem addCartItem(String message) throws Exception {
//        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String,String>>() {};
//        Map<String, String> map = objectMapper.readValue(message, typeReference);
        JSONObject map = new JSONObject(message);
        Cart cart = cartRepository.findByUserId(map.getLong("userId"));
        Product product = productService.getProductById(map.getLong("productId"));
//        CartItem cartItem = cartItemService.createCartItem(product, cart, map.getInt("quantity"), map.getString("options"));
        CartItem check = cartItemRepository.findByProductAndOptionsAndCart(product, map.getString("options"),cart);
        // System.out.println(check.getId());
        if (check != null) { throw new AlreadyExistException("이미 존재하는 상품입니다.."); }
        else {
            CartItem cartItem = cartItemService.createCartItem(product, cart, 1, map.getString("options"));
            List<CartItem> cartItems = cart.getCartItems();
            Integer price = cartItem.getProduct().getPrice();
            Integer total = cart.getPrice();

            JSONObject item_options = new JSONObject(map.getString("options"));
            for (Iterator it = item_options.keys(); it.hasNext(); ) {
                String key = (String) it.next();
                List<ProductOptionDetail> pods = productOptionDetailService.findOptionDetailsByProductAndOptionTitle(product, key);
                for (ProductOptionDetail pod : pods) {
                    if ( item_options.getString(key).equals(pod.getContent()) ) {
                        price += pod.getValue();
                        break;
                    }
                }
            }
            cartItem.setValue(price * map.getInt("quantity"));
            cartItemService.saveCartItem(cartItem);
//        return productRepository.findByPriceBetweenAndNameContainingAndCategory(minPrice, maxPrice, name, category);
            cartItems.add(cartItem);
            cart.setPrice(total + cartItem.getValue());
            cart.setQuantity(cart.getQuantity() + 1);
            cart.setCartItems(cartItems);
            saveCart(cart);
            return cartItem;
        }
    }

    public Cart deleteItemInCart(Long cartId, Long cartItemId) throws Exception {
//        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String,String>>() {};
//        Map<String, String> map = objectMapper.readValue(message, typeReference);

        Cart cart =  getCartById(cartId);
        CartItem cartItem = cartItemService.getCartItemById(cartItemId);
        Integer price = cartItem.getValue();

        List<CartItem> cartItems = cart.getCartItems();
        cartItems.remove(cartItem);
        Integer total = cart.getPrice();
        cartItemService.deleteCartItem(cartItem.getId());

        cart.setPrice(total - price);
        cart.setQuantity(cart.getQuantity() - 1);
        cart.setCartItems(cartItems);
        return saveCart(cart);
    }

    public String deleteCart(Long cartId) {
        Cart cart =  getCartById(cartId);
        List<CartItem> cartItems = cart.getCartItems();

        for (CartItem cartItem : cartItems) {
            cartItemService.deleteCartItem(cartItem.getId());
        }
        cartRepository.deleteById(cartId);
        return "delete success!!" + cartId;
    }

}
