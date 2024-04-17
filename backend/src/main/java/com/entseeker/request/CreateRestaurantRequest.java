package com.entseeker.request;

import com.entseeker.model.ContactInformation;
import com.entseeker.model.RestaurantAddress;
import lombok.Data;

import java.util.List;

@Data
public class CreateRestaurantRequest {

    private Long id;
    private String name;
    private String description;
    private String cuisineType;
    private RestaurantAddress address;
    private ContactInformation contactInformation;
    private String openingHours;
    private List<String> images;

}
