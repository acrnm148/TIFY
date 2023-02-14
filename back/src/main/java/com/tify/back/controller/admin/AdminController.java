package com.tify.back.controller.admin;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.tify.back.dto.admin.EditWishDto;
import com.tify.back.dto.admin.OrderStateDto;
import com.tify.back.dto.admin.UserListMap;
import com.tify.back.dto.admin.createUserDto;
import com.tify.back.model.customerservice.FAQ;
import com.tify.back.model.customerservice.QnA;
import com.tify.back.model.gifthub.Cart;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.Order;
import com.tify.back.model.users.User;
import com.tify.back.model.wish.Wish;
import com.tify.back.repository.customerservice.FAQRepository;
import com.tify.back.repository.customerservice.QnARepository;
import com.tify.back.repository.gifthub.GiftRepository;
import com.tify.back.repository.gifthub.OrderRepository;
import com.tify.back.repository.users.UserRepository;
import com.tify.back.repository.wish.WishRepository;
import com.tify.back.service.gifthub.CartService;
import com.tify.back.service.gifthub.OrderService;
import com.tify.back.service.users.UserService;
import com.tify.back.service.wish.WishService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final WishRepository wishRepository;
    private final WishService wishService;
    private final CartService cartService;
    private final OrderService orderService;
    private final GiftRepository giftRepository;
    private final QnARepository qnARepository;
    private final FAQRepository fAQRepository;
    private final OrderRepository orderRepository;
//    @GetMapping("/userlist")
//    public List<User> getUserList() {}

    //    @PostAuthorize("permitAll()")
    @Operation(summary = "admin's user creation", description = "관리자 직접 유저생성")
    @PreAuthorize("permitAll()")
    @PostMapping("/user")
    public User createUser(@RequestBody createUserDto dto) {
    //		User user = dto.toEntity();
        User user = dto.toEntity();
        userService.save(user);
        Cart cart = new Cart();
        cart.setUser(user);
        cartService.saveCart(cart);
        user.setCart(cart);
        return userService.save(user);
    }

    @Operation(summary = "admin page userList", description = "관리자페이지 유저목록")
    @GetMapping("/user")
    public  Page<UserListMap> getUserList(@RequestParam(value = "page", required = false) Integer page,
                                          @RequestParam(value = "max_result", required = false) Integer max_result) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return userRepository.findAllUsers(pageable);
    }

    @GetMapping("/usersearch/{email}")
    public  Page<UserListMap> searchUserListByEmail(@RequestParam(value = "page", required = false) Integer page,
                                          @RequestParam(value = "max_result", required = false) Integer max_result,
                                        @PathVariable String email) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return userRepository.findAllUsersByEmail(pageable, email);
    }

    @Operation(summary = "admin page userDetail", description = "관리자페이지 유저상세")
    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
    @Operation(summary = "admin page edit user info", description = "관리자페이지 유저 정보 수정")
    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        User existedUser = userRepository.findById(id).orElse(null);
        existedUser.setUserid(user.getUserid());
        existedUser.setPassword(user.getPassword());
        existedUser.setUsername(user.getUsername());
        existedUser.setRoles(user.getRoles());
        existedUser.setNickname(user.getNickname());
        existedUser.setBirth(user.getBirth());
        existedUser.setBirthYear(user.getBirthYear());
        existedUser.setTel(user.getTel());
        existedUser.setAddr1(user.getAddr1());
        existedUser.setAddr2(user.getAddr2());
        existedUser.setZipcode(user.getZipcode());
        existedUser.setGender(user.getGender());
        existedUser.setEmail(user.getEmail());
        existedUser.setEmailAuth(user.getEmailAuth());
        existedUser.setProvider(user.getProvider());
        existedUser.setProfileImg(user.getProfileImg());
        return userService.save(existedUser);
    }

    @Operation(summary = "admin page delete user", description = "관리자페이지 유저 삭제")
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        userRepository.deleteById(id);
        return user.getId() + " " + user.getEmail() + " user successfully deleted";
    }

    @Operation(summary = "admin page wishList", description = "관리자페이지 wish 목록")
    @GetMapping("/wish")
    public Page<Wish> getWishList(@RequestParam(value = "page", required = false) Integer page,
                                  @RequestParam(value = "max_result", required = false) Integer max_result) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return wishRepository.findAllWishes(pageable);
    }

    @Operation(summary = "admin page search wishList", description = "관리자페이지 wish 목록")
    @GetMapping("/wishsearch/{search}")
    public Page<Wish> getWishList(@RequestParam(value = "page", required = false) Integer page,
                                  @RequestParam(value = "max_result", required = false) Integer max_result,
                                  @PathVariable String search) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return wishRepository.findByUserEmailContaining(search, pageable);
    }

    @Operation(summary = "admin page wish detail", description = "관리자페이지 wish detail")
    @GetMapping("/wish/{id}")
    public Wish getWishDetail(@PathVariable Long id) {
        return wishRepository.findById(id).orElse(null);
    }

    @PutMapping("/wish/{id}")
    public Wish updateWish(@PathVariable Long id, @RequestBody EditWishDto dto) {
        System.out.println(dto.getTitle());
        System.out.println(dto.getAddr2());
        System.out.println("--------------------------");
        Wish existedWish = wishRepository.findById(id).orElse(null);
        existedWish.setTotPrice(dto.getTotPrice());
        existedWish.setNowPrice(dto.getNowPrice());
        existedWish.setTitle(dto.getTitle());
        existedWish.setContent(dto.getContent());
        existedWish.setFinishYN(dto.getFinishYN());
        existedWish.setEndDate(dto.getEndDate());
        existedWish.setCardImageCode(dto.getCardImageCode());
        existedWish.setAddr1(dto.getAddr1());
        existedWish.setAddr2(dto.getAddr2());
        existedWish.setZipCode(dto.getZipCode());
        existedWish.setCategory(dto.getCategory());
        return wishRepository.save(existedWish);
    }
    @Operation(summary = "admin page delete wish", description = "관리자페이지 wish 삭제")
    @DeleteMapping("/wish/{id}")
    public String deleteWish(@PathVariable Long id) {
        return wishService.deleteWishById(id);
    }

    // 상품들은 product api 활용. 별도로 안만들 것
    // qna, faq도 자체 api 활용
    //

    /**
     * 운송장번호, 주문상태 수정
     */
    @PostMapping("/orderState")
    private ResponseEntity<?> updateDeliverState(@RequestBody OrderStateDto dto) {
        Order order = orderService.updateDeliverState(dto);
        System.out.println("수정 완료:"+order);
        return ResponseEntity.ok().body(order);
    }

    @Operation(summary = "admin page gift search ", description = "관리자페이지 gift search")
    @GetMapping("/giftsearch/{search}")
    public Page<Gift> getGiftSearch(@RequestParam(value = "page", required = false) Integer page,
                                    @RequestParam(value = "max_result", required = false) Integer max_result,
                                    @PathVariable String search) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return giftRepository.findByGiftnameContaining(search,pageable);
    }

    @Operation(summary = "admin page qna search ", description = "관리자페이지 qna search")
    @GetMapping("/qnasearch/{search}")
    public Page<QnA> getQnASearch(@RequestParam(value = "page", required = false) Integer page,
                                   @RequestParam(value = "max_result", required = false) Integer max_result,
                                   @PathVariable String search) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return qnARepository.findByUserEmailContainingOrTitleContaining(search,pageable);
    }

    @Operation(summary = "admin page faq search ", description = "관리자페이지 faq search")
    @GetMapping("/faqsearch/{search}")
    public Page<FAQ> getFAQSearch(@RequestParam(value = "page", required = false) Integer page,
                                  @RequestParam(value = "max_result", required = false) Integer max_result,
                                  @PathVariable String search) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return fAQRepository.findFAQByTitle(search, pageable);
    }

    @Operation(summary = "admin page order search ", description = "관리자페이지 order search")
    @GetMapping("/ordersearch/{email}")
    public Page<Order> getOrderSearch(@RequestParam(value = "page", required = false) Integer page,
                                  @RequestParam(value = "max_result", required = false) Integer max_result,
                                  @PathVariable String email) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result), Sort.by("createdTime").ascending());

        return orderRepository.findByUserEmail(email, pageable);
    }

    @Operation(summary = "admin page order", description = "관리자페이지 order")
    @GetMapping("/order")
    public Page<Order> getOrderSearch(@RequestParam(value = "page", required = false) Integer page,
                                      @RequestParam(value = "max_result", required = false) Integer max_result) {
        if (page == null) { page = 0; }
        if (max_result == null) {max_result = 0; }
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result), Sort.by("createdTime").ascending());
        return orderRepository.findAll(pageable);
    }

    @GetMapping("/coupang")
    public String getResponseFromUrl() throws IOException {
        String url = "https://www.coupang.com/vp/products/6750315320?vendorItemId=82998649313&sourceType=HOME_PERSONALIZED_ADS&searchId=feed-98f09a63b90a41be901f9334da17a552-personalized_ads&clickEventId=3531b3cc-d3c8-4c35-b016-81f11f3b51cd&isAddedCart=";

        // Get product page HTML using OkHttp
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .build();
        Response response = client.newCall(request).execute();
        String html = response.body().string();

        // Parse HTML using Jsoup
        Document doc = Jsoup.parse(html);
        Element priceElement = doc.selectFirst("div.prod-price > span.origin-price, div.prod-price > span.total-price");
        String price = priceElement.text().replaceAll("[^\\d]", "");
        Element imageElement = doc.selectFirst("#repImageContainer > img");
        String imageSrc = imageElement.attr("src");

        // Add data to model and return view
        System.out.println(price);
        System.out.println(imageSrc);
        return "product";
    }

}

