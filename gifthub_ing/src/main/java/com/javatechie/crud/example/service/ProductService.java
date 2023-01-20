package com.javatechie.crud.example.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javatechie.crud.example.common.CommonMethods;
import com.javatechie.crud.example.entity.Img;
import com.javatechie.crud.example.entity.Product;
import com.javatechie.crud.example.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ImgService imgService;
    ObjectMapper objectMapper = new ObjectMapper();
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> saveProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }
    public Product getProductByName(String name) {
        return productRepository.findByName(name);
    }
    public String deleteProduct(int id) {
        productRepository.deleteById(id);
        return "product removed !!" + id;
    }

    public List<Product> searchProducts(int minPrice, int maxPrice, String name, Integer category) {
        return productRepository.findByPriceBetweenAndNameContainingAndCategory(minPrice, maxPrice, name, category);
    }
    public List<Product> searchProducts2(int minPrice, int maxPrice, String name) {
        return productRepository.findByPriceBetweenAndNameContaining(minPrice,maxPrice,name);
    }

    public Product updateProduct(Product product) {
        Product existingProduct = productRepository.findById(product.getId()).orElse(null);
        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setImgList(product.getImgList());
        return productRepository.save(existingProduct);
    }

    public static void addImg(Product product,Img img) {
        product.getImgList().add(img);
    }

    public Product createProduct(String message) throws Exception {
        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String,String>>() {};
        Map<String, String> map = objectMapper.readValue(message, typeReference);
        Product product = new Product();
        List<Img> images = new ArrayList<>();


        String temp = map.get("imgList");
        temp = temp.substring(1, temp.length() - 1);
        List<String> urls = Arrays.asList(temp.split(","));
        this.saveProduct(product); //fk가 없는 상태로 img 저장하려하면 오류뜸

        for (int i = 0; i < urls.size(); i++) {
//            Img img = imgService.saveImg(Img.createImg(product,urls.get(i)));
            if (urls.get(i) != null && urls.get(i) != "") {
                Img img = Img.createImg(product,urls.get(i));
                images.add(img);
                imgService.saveImg(img);
            }
        }
        product.setName(map.get("name"));
        product.setPrice(Integer.valueOf(map.get("price")));
        product.setQuantity(Integer.valueOf(map.get("quantity")));
        product.setCategory(Integer.valueOf(map.get("category")));
        product.setDescription(map.get("description"));
        product.setImgList(images);

        this.saveProduct(product);
        return product;
    }

}
