package com.entseeker.request;

import lombok.Data;

@Data
public class UserAddressRequest {

    private String streetAddress;
    private String city;
    private String state;
    private Integer pincode;
    private String country;
}
