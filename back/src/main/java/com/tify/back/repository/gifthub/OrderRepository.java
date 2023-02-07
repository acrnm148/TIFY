package com.tify.back.repository.gifthub;

import com.tify.back.model.gifthub.Order;
import com.tify.back.model.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    public List<Order> findAllByUser(User user);
}