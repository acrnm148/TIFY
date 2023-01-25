package com.tify.back.service.gifthub;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.tify.back.exception.NoOptionsException;
import com.tify.back.exception.NoProductImgsException;
import com.tify.back.exception.ProductNotFoundException;

import com.tify.back.model.gifthub.Img;
import com.tify.back.model.gifthub.Product;
import com.tify.back.model.gifthub.ProductOption;
import com.tify.back.repository.gifthub.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<Product> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found"));
    }
    public Product getProductByName(String name) {
        return productRepository.findByName(name);
    }
    public String deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found"));
        List<Img> imgs = product.getImgList();
        List<ProductOption> productOptions = product.getOptions();
        for (Img img : imgs) {
            imgService.deleteImg(img.getId());
        }
        for (ProductOption productOption : productOptions) {
            productOptionService.deleteproductOption(productOption.getId());
        }
        productRepository.deleteById(id);
        return "product removed !!" + id;
    }

    public Page<Product> searchProducts(int minPrice, int maxPrice, String name, Integer category, Pageable pageable) {
        return productRepository.findByPriceBetweenAndNameContainingAndCategory(minPrice, maxPrice, name, category, pageable);
    }
    public Page<Product> searchProducts2(int minPrice, int maxPrice, String name, Pageable pageable) {
        return productRepository.findByPriceBetweenAndNameContaining(minPrice,maxPrice, name, pageable);
    }
    public List<Product> searchProducts3(int minPrice, int maxPrice, String name) {
        return productRepository.findByMyMethod(minPrice, maxPrice, name);
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
//여러개의 큰 옵션
        List<ProductOption> opts = new ArrayList<>();

        try {
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
        } catch (Exception e) {
            throw new NoOptionsException("No options found");
        } finally {
            List<Img> images = new ArrayList<>();
            try {
                JSONArray imagelist = map.getJSONArray("images");
                for (int i = 0; i < imagelist.length(); i++) {
                    JSONObject image = imagelist.getJSONObject(i);
                    Img img = new Img(product,image.getString("url"),image.getInt("idx"));
                    images.add(img);
                    imgService.saveImg(img);
                }
            } catch (Exception e) {
                throw new NoProductImgsException("No images found");
            } finally {
                try {
                    product.setCategory(map.getInt("category"));
                } catch (Exception e) {
                    product.setCategory(0);
                } finally {
                    product.setName(map.getString("name"));
                    String price = map.getString("price").replaceAll(",","");
                    product.setPrice(Integer.parseInt(price));
                    product.setQuantity(map.getInt("quantity"));

                    product.setDescription(map.getString("description"));
                    product.setImgList(images);
                    product.setOptions(opts);
                    product.setRepImg(map.getString("repImg"));

//        this.saveProduct(product);// fk가 없는 상태로 img 저장하려하면 오류뜸
                    return product;
                }
            }
        }
    }

    public Product updateProduct(String message) throws Exception {
        JSONObject map = new JSONObject(message);
        Product existingProduct = productRepository.findById(map.getLong("id")).orElse(null);
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
        existingProduct.setDescription(map.getString("description"));
        existingProduct.setImgList(images);
        existingProduct.setOptions(opts);
        existingProduct.setRepImg(map.getString("repImg"));
        return productRepository.save(existingProduct);
    }
}
