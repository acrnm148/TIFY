package com.tify.back.gifthub.service;

import com.tify.back.gifthub.entity.Product;
import com.tify.back.gifthub.entity.ProductOption;
import com.tify.back.gifthub.entity.ProductOptionDetail;
import com.tify.back.gifthub.repository.ProductOptionRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductOptionService {
    private final ProductOptionRepository productOptionRepository;
    private final ProductOptionDetailService productOptionDetailService;
    public ProductOption saveProductOption(ProductOption productOption) {
        return productOptionRepository.save(productOption);
    }

    public List<ProductOption> saveproductOptions(List<ProductOption> productOptions) {
        return productOptionRepository.saveAll(productOptions);
    }

    public List<ProductOption> getproductOptions() {
        return productOptionRepository.findAll();
    }

    public ProductOption getproductOptionById(Long id) {
        return productOptionRepository.findById(id).orElse(null);
    }
    public String deleteproductOption(Long id) {
        productOptionRepository.deleteById(id);
        return "productOption removed !!" + id;
    }

    public ProductOption createProductOption (Product product,String title, int idx, List<JSONObject> arr) throws JSONException {
        ProductOption productOption = new ProductOption();
        productOption.setProduct(product);
        productOption.setTitle(title);
        productOption.setIdx(idx);
        productOption = this.saveProductOption(productOption);
        List<ProductOptionDetail> details = new ArrayList<>();
        for (JSONObject obj : arr) {
            ProductOptionDetail productOptionDetail =
                    new ProductOptionDetail(obj.getString("content"), obj.getInt("value"), obj.getInt("idx"), productOption);
            details.add(productOptionDetailService.saveProductOptionDetail(productOptionDetail));
        }

        productOption.setDetails(details);
        this.saveProductOption(productOption);
        return productOption;
    }
}
