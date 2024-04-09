package com.entseeker.controller;

import com.entseeker.Service.FoodService;
import com.entseeker.Service.RestaurantService;
import com.entseeker.Service.UserService;
import com.entseeker.model.Food;
import com.entseeker.model.Restaurant;
import com.entseeker.model.User;
import com.entseeker.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Food> foods = foodService.searchFood(name);

        return new ResponseEntity<>(foods, HttpStatus.CREATED);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(@RequestParam (required = false) boolean vegetarian,
                                                        @RequestParam (required = false) boolean seasonal,
                                                        @RequestParam (required = false) boolean nonVeg,
                                                        @RequestParam(required = false) String foodCategory,
                                                 @PathVariable Long restaurantId,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Food> foods = foodService.getRestaurantsFood(restaurantId, vegetarian, seasonal, nonVeg, foodCategory);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }
}
