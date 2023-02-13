package com.tify.back.repository.gifthub;

import org.springframework.data.domain.Page;
import com.tify.back.model.gifthub.Order;
import com.tify.back.model.users.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    public Page<Order> findAllByUser(User user, Pageable pageable);
    //public List<Order> findAllByUser(User user);

    Page<Order> findByUserEmail(String email, Pageable pageable);

    Page<Order> findAll(Pageable page);
}