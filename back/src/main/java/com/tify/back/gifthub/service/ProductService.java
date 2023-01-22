package com.tify.back.gifthub.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.tify.back.gifthub.entity.Img;
import com.tify.back.gifthub.entity.Product;
import com.tify.back.gifthub.entity.ProductOption;
import com.tify.back.gifthub.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ImgService imgService;
    private final ProductOptionService productOptionService;
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

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
    public Product getProductByName(String name) {
        return productRepository.findByName(name);
    }
    public String deleteProduct(Long id) {
        productRepository.deleteById(id);
        return "product removed !!" + id;
    }

    public List<Product> searchProducts(int minPrice, int maxPrice, String name, Integer category) {
        return productRepository.findByPriceBetweenAndNameContainingAndCategory(minPrice, maxPrice, name, category);
    }
    public List<Product> searchProducts2(int minPrice, int maxPrice, String name) {
        return productRepository.findByPriceBetweenAndNameContaining(minPrice,maxPrice,name);
    }

    public static void addImg(Product product, Img img) {
        product.getImgList().add(img);
    }

    @Transactional
    public Product createProduct(String message) throws Exception {
//        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String,String>>() {};
//        Map<String, String> map = objectMapper.readValue(message, typeReference);
        Product product = new Product();
        product = this.saveProduct(product);
        JSONObject map = new JSONObject(message);

        List<ProductOption> opts = new ArrayList<>();
        //여러개의 큰 옵션
        JSONArray optionlist = map.getJSONArray("options");

        for(int i=0; i<optionlist.length() ; i++){
            JSONObject option = optionlist.getJSONObject(i);
            List<JSONObject> details = new ArrayList<>();
            System.out.println(option.toString());
            JSONArray detaillist = option.getJSONArray("details");
            for (int j = 0; j < detaillist.length(); j++) {
                details.add(detaillist.getJSONObject(j));
            }
            String title = option.getString("title");
            int idx = option.getInt("idx");
            opts.add(productOptionService.createProductOption(product, title, idx, details));
        }

        JSONArray imagelist = map.getJSONArray("images");
        List<Img> images = new ArrayList<>();
        for (int i = 0; i < imagelist.length(); i++) {
            JSONObject image = imagelist.getJSONObject(i);
            Img img = new Img(product,image.getString("url"),image.getInt("idx"));
            images.add(img);
            imgService.saveImg(img);
        }

        product.setName(map.getString("name"));
        product.setPrice(map.getInt("price"));
        product.setQuantity(map.getInt("quantity"));
        product.setCategory(map.getInt("category"));
        product.setDescription(map.getString("description"));
        product.setImgList(images);
        product.setOptions(opts);
        product.setRepImg(map.getString("repImg"));

//        this.saveProduct(product);// fk가 없는 상태로 img 저장하려하면 오류뜸
        return product;
    }

    public Product updateProduct(String message) throws Exception {
        JSONObject map = new JSONObject(message);
        Product existingProduct = productRepository.findById(map.getLong("productId")).orElse(null);
        List<ProductOption> opts = new ArrayList<>();
        //여러개의 큰 옵션
        JSONArray optionlist = map.getJSONArray("options");
        for (ProductOption option : existingProduct.getOptions()) {
            productOptionService.deleteproductOption(option.getId());
        }
        for (Img img : existingProduct.getImgList()) {
            imgService.deleteImg(img.getId());
        }
        // 일단 귀차나서 새로 생성하는 식으로 해버렸음.
        for(int i=0; i<optionlist.length() ; i++){
            JSONObject option = optionlist.getJSONObject(i);
            List<JSONObject> details = new ArrayList<>();
            System.out.println(option.toString());
            JSONArray detaillist = option.getJSONArray("details");
            for (int j = 0; j < detaillist.length(); j++) {
                details.add(detaillist.getJSONObject(j));
            }
            String title = option.getString("title");
            int idx = option.getInt("idx");
            opts.add(productOptionService.createProductOption(existingProduct, title, idx, details));
        }

        // 일단 귀찮아서 새로 생성하는 식으로 해버렸음.
        JSONArray imagelist = map.getJSONArray("images");
        List<Img> images = new ArrayList<>();
        for (int i = 0; i < imagelist.length(); i++) {
            JSONObject image = imagelist.getJSONObject(i);
            Img img = new Img(existingProduct,image.getString("url"),image.getInt("idx"));
            images.add(img);
            imgService.saveImg(img);
        }

        existingProduct.setName(map.getString("name"));
        existingProduct.setPrice(map.getInt("price"));
        existingProduct.setQuantity(map.getInt("quantity"));
        existingProduct.setCategory(map.getInt("category"));
        existingProduct.setDescription(map.getString("description"));
        existingProduct.setImgList(images);
        existingProduct.setOptions(opts);
        existingProduct.setRepImg(map.getString("repImg"));
        return productRepository.save(existingProduct);
    }
}
