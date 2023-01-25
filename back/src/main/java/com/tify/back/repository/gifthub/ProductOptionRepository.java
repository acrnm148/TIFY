package com.tify.back.repository.gifthub;


import com.tify.back.model.gifthub.ProductOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductOptionRepository extends JpaRepository<ProductOption, Long> {
}
