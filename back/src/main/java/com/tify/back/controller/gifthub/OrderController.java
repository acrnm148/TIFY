package com.tify.back.controller.gifthub;

import com.tify.back.dto.admin.OrderStateDto;
import com.tify.back.model.gifthub.Gift;
import com.tify.back.model.gifthub.Order;
import com.tify.back.service.gifthub.GiftService;
import com.tify.back.service.gifthub.OrderService;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value="/api/order")
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

    /**
     * 배송 조회
     */
//    @GetMapping("/deliver")
//    private ResponseEntity<?> checkDelivery(@RequestParam("company") String company, @RequestParam("number") String number) {
//        //운송장번호를 가지고 배송 조회
//        String KEY = "Hzm5Yw8F24dc4RJvSYkGWA";
//        String url = "https://info.sweettracker.co.kr/api/v1/trackingInfo?"+
//                "t_code="+company+ //04
//                "&t_invoice="+number+ //568706335164
//                "&t_key="+KEY;
//        DeliveryDto deliveryDto = orderService.getDeliveryList(url);
//        return ResponseEntity.ok().body(deliveryDto);
//    }

    /**
     * 운송장번호 수정, 주문상태 변경
     */
    @PostMapping("/updateOrderState")
    private ResponseEntity<?> udpateOrderState(@RequestBody OrderStateDto orderStateDto) {
        Order order = orderService.updateDeliverState(orderStateDto);
        return ResponseEntity.ok().body(order);
    }
}
