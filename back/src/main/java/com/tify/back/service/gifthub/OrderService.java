package com.tify.back.service.gifthub;


import com.tify.back.exception.OrderAlreadyExistException;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.Order;
import com.tify.back.repository.gifthub.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.List;

import static net.minidev.json.JSONValue.isValidJson;

@RequiredArgsConstructor
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final GiftService giftService;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> saveOrders(List<Order> orders) {
        return orderRepository.saveAll(orders);
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
    public String deleteOrder(Long id) {
        orderRepository.deleteById(id);
        return "order removed !!" + id;
    }
    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public String deleteOrderById(Long id) {
        orderRepository.deleteById(id);
        return "order removed!!" + id;
    }

    public Order createOrder(String message) throws JSONException {
        JSONObject map;
        if (isValidJson(message)) {
            map = new JSONObject(message);
        } else {
            throw new JSONException("Invalid JSON");
        }
        Order order = new Order();
        Gift gift = giftService.getGiftById(map.getLong("giftId"));
        if (gift.getOrder() != null) {
            throw new OrderAlreadyExistException("This gift's order is already taken.");
        }
        order.setGift(gift);
        order.setTel(map.getString("tel"));
        order.setGatheredPrice(map.getInt("gatheredPrice"));
        order.setOrderPrice(map.getInt("orderPrice"));
        order.setDeliveryNumber(map.getString("deliveryNumber"));
        order.setState(map.getInt("state"));
        try {
            order.setUser(gift.getWish().getUser());
        } catch (Exception e) {
            order.setUser(null);
        }
        orderRepository.save(order);
        gift.setOrder(order);
        giftService.saveGift(gift);
        return order;
    }
}
