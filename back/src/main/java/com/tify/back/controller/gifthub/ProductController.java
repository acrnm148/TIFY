package com.tify.back.controller.gifthub;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.tify.back.dto.gifthub.ProductDto;
import com.tify.back.dto.gifthub.ProductSummary;
import com.tify.back.model.gifthub.Product;
import com.tify.back.repository.gifthub.ProductRepository;
import com.tify.back.service.gifthub.CartService;
import com.tify.back.service.gifthub.ImgService;
import com.tify.back.service.gifthub.ProductService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gifthub")
public class ProductController {

    private final ProductService productService;
    private final ImgService imgService;
    private final CartService cartService;
    ObjectMapper objectMapper = new ObjectMapper();
    private final ProductRepository productRepository;

//    @PostMapping("/addproduct")
//    public Product addProduct(@RequestBody Product product) {
//        return productService.saveProduct(product);
//    }

    //https://devjaewoo.tistory.com/88 error 참고.
    // 상품 등록 단일 json 형태
    @PostMapping("/product")
    public Product addProduct(@RequestBody String message) throws Exception {
        return productService.createProduct(message);
    }

    @PostMapping("/pyproduct")
    public Product testProduct(@RequestBody ProductDto dto) throws Exception {
        return productService.pyProduct(dto);
    }
//    @PostMapping("/testproduct")
//    public String testProduct(@RequestBody String message) throws Exception {
//        System.out.println(message);
//        return productService.temp(message);
//    }
    // 상품 여러개 한번에 등록 [ json, json, ... ] 형태
    @PostMapping("/products") //여러개 한번에 찜하진 않을듯.
    public List<Product> addProducts(@RequestBody String messages) throws Exception {
        List<Product> products = new ArrayList<>();
        JSONArray jsonArray = new JSONArray(messages);

        for(int i=0; i<jsonArray.length() ; i++){
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            System.out.println(jsonObject.toString());
            products.add(productService.createProduct(jsonObject.toString()) ) ;
        }
//        return products;
        return products;
    }

    // 등록된 모든 아이템 목록 요청
    @GetMapping("/products")
    public Page<Product> getProducts(@RequestParam(value = "page", required = false) Integer page,
                                     @RequestParam(value = "max_result", required = false) Integer max_result) {
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));
        return productService.getProducts(pageable);
    }

    // 이름, 가경, 대표이미지 정보만 가져온다. (like count 정렬 완료)
    @GetMapping("/main")
    public List<ProductSummary> getGifthubList() throws Exception { return productRepository.findAllProjectedBy();}
    //    @GetMapping("/product/{id}")
//    public Product findProductById(@PathVariable int id) {
//        return productService.getProductById(id);
//    }

    // 상품 id로 검색(detail page)
    @GetMapping("/product/{id}")
    public Product findProduct(@PathVariable Long id) {
        // text.chars().allMatch(Character::isDigit); 이렇게 boolean 반환 받기도 가능
        return productService.getProductById(id);
    }

    //검색, 필터링.
    @GetMapping("/search")
    public Page<Product> searchProductsByConditions(@RequestParam(value = "minPrice", required = false) Integer minPrice,
                                                    @RequestParam(value = "maxPrice", required = false) Integer maxPrice,
                                                    @RequestParam(value = "name", required = false) String name,
                                                    @RequestParam(value = "category", required = false) Integer category,
                                                    @RequestParam(value = "page", required = false) Integer page,
                                                    @RequestParam(value = "max_result", required = false) Integer max_result) {
        Integer min = 0;
        Integer maxp = 999999999;
        if (page == null) { page = 0;}
        if (max_result == null) { max_result = 10;}

        Page<Product> products;
        Pageable pageable = PageRequest.of(page, Math.max(10, max_result));

        if (minPrice == null) { minPrice = 0;}
        if (maxPrice == null) { maxPrice = 999999999;}

        if (category!= null) {products = productService.searchProducts(minPrice, maxPrice, name, category, pageable);}
        else {products = productService.searchProducts2(minPrice, maxPrice, name, pageable);} // 변수 이름도 다 맞춰야 한다...
        return products;
//        return productService.getProducts();
    }
    //http://localhost:8080/search/?minPrice=10&maxPrice=1000

    // 상품 정보 update
    @PutMapping("/product")
    public Product updateProduct(@RequestBody String message) throws Exception {
        return productService.updateProduct(message);
    }

    // 상품 삭제.
    @DeleteMapping("/product/{id}")
    public String deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }


}