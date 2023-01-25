package com.tify.back.gifthub.service;

import com.tify.back.gifthub.entity.Img;
import com.tify.back.gifthub.entity.Product;
import com.tify.back.gifthub.entity.ProductOptionDetail;
import com.tify.back.gifthub.repository.ImgRepository;
import com.tify.back.gifthub.repository.ProductOptionDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductOptionDetailService {
    private final ProductOptionDetailRepository productOptionDetailRepository;

    public ProductOptionDetail saveProductOptionDetail(ProductOptionDetail productOptionDetail) {
        return productOptionDetailRepository.save(productOptionDetail);
    }

    public List<ProductOptionDetail> saveproductOptionDetails(List<ProductOptionDetail> productOptionDetails) {
        return productOptionDetailRepository.saveAll(productOptionDetails);
    }

    public List<ProductOptionDetail> getproductOptionDetails() {
        return productOptionDetailRepository.findAll();
    }

    public ProductOptionDetail getproductOptionDetailById(Long id) {
        return productOptionDetailRepository.findById(id).orElse(null);
    }
    public String deleteproductOptionDetail(Long id) {
        productOptionDetailRepository.deleteById(id);
        return "ProductOptionDetail removed !!" + id;
    }

    public List<ProductOptionDetail> findOptionDetailsByProductAndOptionTitle(Product product, String optionTitle) {
        return productOptionDetailRepository.findByProductAndOptionTitle(product, optionTitle);
    }
}
