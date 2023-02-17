package com.tify.back.controller.gifthub;



import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.tify.back.dto.gifthub.CartPageRequest;
import com.tify.back.dto.gifthub.GiftDto;
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
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/new")
public class NewController {

    private final ProductService productService;
    private final ImgService imgService;
    private final CartService cartService;
    private final CartItemService cartItemService;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    @PostMapping("/crawler")
    public GiftDto crawlGift(@RequestBody Map<String,String> map) throws IOException {
        String giftUrl = map.get("giftUrl");
        GiftDto dto = new GiftDto();

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(giftUrl)
                .build();
        Response response = client.newCall(request).execute();
        String html = response.body().string();
        // Parse HTML using Jsoup
        Document doc = Jsoup.parse(html);
        String price = "";
        String imgUrl = doc.head().getElementsByAttributeValue("property","og:image").attr("content");
        try {
            price = doc.getElementsByClass("origin-price").first().text().replaceAll("[^\\d]", "");
        } catch (Exception e) {
            price = doc.getElementsByClass("total-price").first().text().replaceAll("[^\\d]", "");
        }
        String productName = doc.getElementsByClass("prod-buy-header__title").first().text();

        dto.setGiftImgUrl(imgUrl);
        dto.setGiftname(productName);
        dto.setPurePrice(Integer.parseInt(price));

        return dto;
    }



}