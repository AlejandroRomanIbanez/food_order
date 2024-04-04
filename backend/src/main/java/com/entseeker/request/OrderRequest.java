package com.entseeker.request;

import com.entseeker.model.Address;
import lombok.Data;

@Data
public class OrderRequest {

    private Long RestaurantId;
    private Address deliveryAddress;
}
