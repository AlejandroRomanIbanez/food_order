package com.entseeker.repository;

import com.entseeker.model.Address;
import com.entseeker.model.DeliveryAddress;
import com.entseeker.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    public List<Order> findByCustomerId(Long UserId);

    public List<Order> findByRestaurantId(Long RestaurantId);

    public List<Order> findByDeliveryAddress(DeliveryAddress address);

}
