package com.entseeker.controller;

import com.entseeker.Service.FoodService;
import com.entseeker.Service.RestaurantService;
import com.entseeker.Service.UserService;
import com.entseeker.model.Food;
import com.entseeker.model.Restaurant;
import com.entseeker.model.User;
import com.entseeker.request.CreateFoodRequest;
import com.entseeker.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());
        Food food = foodService.createFood(req, req.getCategory(), restaurant);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{foodId}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long foodId,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        foodService.deleteFood(foodId);

        MessageResponse res = new MessageResponse();
        res.setMessage("Food deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/{foodId}")
    public ResponseEntity<Food> updateFoodAvailabilityStatus(@PathVariable Long foodId,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.updateAvailabilityStatus(foodId);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }
}
