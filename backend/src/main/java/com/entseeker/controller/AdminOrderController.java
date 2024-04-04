package com.entseeker.controller;

import com.entseeker.Service.OrderService;
import com.entseeker.Service.UserService;
import com.entseeker.model.Order;
import com.entseeker.model.User;
import com.entseeker.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;


    @GetMapping("/order/restaurant/{restaurantId}")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable Long restaurantId,
            @RequestParam(required = false) String orderStatus,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getRestaurantsOrder(restaurantId, orderStatus);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/order/{orderId}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId,
                                                         @PathVariable String orderStatus,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.updateOrder(orderId, orderStatus);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
