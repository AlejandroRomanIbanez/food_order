package com.entseeker.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class DeliveryAddress {
    private String streetAddress;
    private String city;
    private String state;
    private Integer pincode;
    private String country;

}
