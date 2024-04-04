package com.entseeker.controller;

import com.entseeker.Service.RestaurantService;
import com.entseeker.Service.UserService;
import com.entseeker.dto.RestaurantDto;
import com.entseeker.model.Restaurant;
import com.entseeker.model.User;
import com.entseeker.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(@RequestHeader("Authorization") String jwt,
                                                            @RequestParam String keyword
                                                       ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        List<Restaurant> restaurant = restaurantService.searchRestaurants(keyword);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurant(@RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        List<Restaurant> restaurant = restaurantService.getAllRestaurants();
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @GetMapping("/{restaurantId}")
    public ResponseEntity<Restaurant> findRestaurantById(@RequestHeader("Authorization") String jwt,
                                                             @PathVariable Long restaurantId
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    @PutMapping("/{restaurantId}/add-favorites")
    public ResponseEntity<RestaurantDto> addToFavorites(@RequestHeader("Authorization") String jwt,
                                                         @PathVariable Long restaurantId
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        RestaurantDto restaurant = restaurantService.addToFavorites(restaurantId, user);
        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

}
