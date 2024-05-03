package com.entseeker.Service;

import com.entseeker.model.Order;
import com.entseeker.model.User;
import com.entseeker.request.OrderRequest;

import java.util.List;
import java.util.Map;

public interface OrderService {

    public void storeOrderRequest(String paymentId, OrderRequest orderRequest);

    public OrderRequest retrieveOrderRequest(String paymentId);

    public Order createOrder(OrderRequest order, User user) throws Exception;

    public Order updateOrder(Long orderId, String OrderStatus) throws Exception;

    public void cancelOrder(Long orderId) throws Exception;

    public List<Order> getUsersOrder(Long UserId) throws Exception;

    public List<Order> getRestaurantsOrder(Long RestaurantId, String OrderStatus) throws Exception;

    public Order findOrderById(Long orderId) throws Exception;

}
