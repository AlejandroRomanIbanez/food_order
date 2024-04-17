package com.entseeker.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
public class RestaurantAddress {

    private String streetAddress;

    private String city;

    private String stateProvince;

    private String postalCode;

    private String country;
}