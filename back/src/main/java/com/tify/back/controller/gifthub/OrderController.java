package com.tify.back.controller.gifthub;

import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.Order;
import com.tify.back.service.gifthub.GiftService;
import com.tify.back.service.gifthub.OrderService;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value="/order")
public class OrderController {
    private final OrderService orderService;
    private final GiftService giftService;
    @GetMapping("/all")
    public List<Order> getOrderList() {
        return orderService.getOrders();
    }
    @GetMapping("/{id}")
    public Order findOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
    @GetMapping("/gift/{id}")
    public Order findOrderByGift(@PathVariable Long id) {
        Gift gift = giftService.getGiftById(id);
        return orderService.getOrderById(gift.getId());
    }
    @PostMapping("/gift/{id}")
    public Order createOrderByGift(@RequestBody String message,@PathVariable Long id) throws JSONException {
        return orderService.createOrder(message);
    }
    @PutMapping("/gift/{id}")
    public Order updateOrderByGift(@RequestBody Order order,@PathVariable Long id) {
        Order existingOrder = findOrderByGift(id);
        existingOrder.setGatheredPrice(order.getGatheredPrice());
        existingOrder.setOrderPrice(order.getOrderPrice());
        existingOrder.setDeliveryNumber(order.getDeliveryNumber());
        existingOrder.setState(order.getState());
        existingOrder.setTel(order.getTel());
        return orderService.saveOrder(existingOrder);
    }
    @DeleteMapping("/gift/{id}")
    public String deleteOrderByGift(@PathVariable Long id) {
        Order order = findOrderByGift(id);
        return orderService.deleteOrderById(order.getId());
    }
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
        return orderService.deleteOrderById(id);
    }
}
