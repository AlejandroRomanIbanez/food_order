package com.entseeker.controller;

import com.entseeker.Service.OrderService;
import com.entseeker.Service.PaymentService;
import com.entseeker.Service.UserService;
import com.entseeker.model.CartItem;
import com.entseeker.model.Order;
import com.entseeker.model.User;
import com.entseeker.request.AddCartItemRequest;
import com.entseeker.request.OrderRequest;
import com.entseeker.response.PaymentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/order")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderRequest req,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        PaymentResponse response = paymentService.createPaymentLink(req, req.getTotalPrice());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/payment/success/{id}")
    public ResponseEntity<Order> paymentSuccess(@PathVariable("id") String paymentId,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        OrderRequest orderReq = orderService.retrieveOrderRequest(paymentId);
        Order order = orderService.createOrder(orderReq, user);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.getUsersOrder(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
