package com.tify.back.repository.pay;

import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.pay.Pay;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@NoRepositoryBean
@Primary
public interface PayRepository extends JpaRepository<Pay, Long>, PayCustomRepository {
    public List<Pay> findAllByUserId(Long userId);
    public List<Pay> findAllByGift(Gift gift);
    //public Optional<Pay> findByPay_id(Long id);
    @Override
    Optional<Pay> findById(Long aLong);
}
