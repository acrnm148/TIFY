package com.javatechie.crud.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.javatechie.crud.example.common.CartDTO;
import com.javatechie.crud.example.entity.Cart;
import com.javatechie.crud.example.entity.Product;
import com.javatechie.crud.example.repository.ProductRepository;
import com.javatechie.crud.example.service.CartService;
import com.javatechie.crud.example.service.ImgService;
import com.javatechie.crud.example.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    @PostMapping("/addproduct")
    public Product test(@RequestBody String message) throws Exception {
        return productService.createProduct(message);
    }
    @PostMapping("/addproducts") //여러개 한번에 찜하진 않을듯.
    public List<Product> addProducts(@RequestBody String messages) throws Exception {
        List<Product> products = new ArrayList<>();
        JSONArray jsonArray = new JSONArray(messages);
        for(int i=0; i<jsonArray.length() ; i++){
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            products.add(productService.createProduct(jsonObject.toString()) ) ;
//            String name = jsonObject.getString("name");
        }
        return products;
    }

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
            return productService.getProductById(Integer.parseInt(text));
        } catch (NumberFormatException e) {
            return productService.getProductByName(text);
        }
    }

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



    @PutMapping("/update")
    public Product updateProduct(@RequestBody Product product) {
        return productService.updateProduct(product);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable int id) {
        return productService.deleteProduct(id);
    }


}