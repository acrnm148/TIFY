package com.tify.back.gifthub.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tify.back.gifthub.entity.Product;
import com.tify.back.gifthub.repository.ProductRepository;
import com.tify.back.gifthub.service.CartService;
import com.tify.back.gifthub.service.ImgService;
import com.tify.back.gifthub.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
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
    @PostMapping("/addproduct")
    public Product test(@RequestBody String message) throws Exception {
        return productService.createProduct(message);
    }
    
    // 상품 여러개 한번에 등록 [ json, json, ... ] 형태
    @PostMapping("/addproducts") //여러개 한번에 찜하진 않을듯.
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
    public List<Product> getProducts() {
        return productService.getProducts();
    }
//    @GetMapping("/product/{id}")
//    public Product findProductById(@PathVariable int id) {
//        return productService.getProductById(id);
//    }

    @GetMapping("/product/{text}")
    public Product findProductByName(@PathVariable String text) {
        // text.chars().allMatch(Character::isDigit); 이렇게 boolean 반환 받기도 가능
        try {
            Double.parseDouble(text);//숫자면
            return productService.getProductById(Long.getLong(text));
        } catch (NumberFormatException e) {
            return productService.getProductByName(text);
        }
    }

    //검색, 필터링.
    @GetMapping("/search")
    public List<Product> searchProductsByConditions(@RequestParam(value = "minPrice", required = false) String minPrice,
                                                    @RequestParam(value = "maxPrice", required = false) String maxPrice,
                                                    @RequestParam(value = "name", required = false) String name,
                                                    @RequestParam(value = "category", required = false) Integer category) {
        Integer minp = 0;
        Integer maxp = 999999999;
        List<Product> products = new ArrayList<>();
        try { minp = Integer.parseInt(minPrice);} catch (NumberFormatException e) {minp = 0;}
        try { maxp = Integer.parseInt(minPrice);} catch (NumberFormatException e) {maxp = 999999999;}

        if (category!= null) {products = productService.searchProducts(minp, maxp, name, category);}
        else {products = productService.searchProducts2(minp, maxp, name);}

        return products;
    }
    //http://localhost:8080/search/?minPrice=10&maxPrice=1000



    // 상품 정보 update
    @PutMapping("/update")
    public Product updateProduct(@RequestBody String message) throws Exception {
        return productService.updateProduct(message);
    }

    // 상품 삭제.
    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }


}