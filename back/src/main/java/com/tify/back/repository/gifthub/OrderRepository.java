package com.tify.back.repository.gifthub;

import com.tify.back.model.gifthub.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}