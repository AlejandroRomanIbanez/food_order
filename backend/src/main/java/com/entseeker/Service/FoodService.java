package com.entseeker.Service;

import com.entseeker.model.Category;
import com.entseeker.model.Food;
import com.entseeker.model.Restaurant;
import com.entseeker.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian,
                                         boolean isNonVeg, boolean isSeasonal, String foodCategory);

    public List<Food> searchFood(String keyword);

    public Food findFoodById(Long foodId) throws Exception;

    public Food updateAvailabilityStatus(Long foodId) throws Exception;

    public Food updateFood(Long foodId, CreateFoodRequest req, Category category) throws Exception;

}
