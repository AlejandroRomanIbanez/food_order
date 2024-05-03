package com.entseeker.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class DeliveryAddress {
    @Column(name = "delivery_address_id", insertable = false, updatable = false)
    private Long id;
    private String streetAddress;
    private String city;
    private String state;
    private Integer pincode;
    private String country;

}
