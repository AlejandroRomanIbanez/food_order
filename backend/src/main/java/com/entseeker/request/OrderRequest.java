package com.entseeker.request;

import com.entseeker.model.Address;
import com.entseeker.model.DeliveryAddress;
import lombok.Data;

@Data
public class OrderRequest {

    private Long RestaurantId;
    private DeliveryAddress deliveryAddress;
}
