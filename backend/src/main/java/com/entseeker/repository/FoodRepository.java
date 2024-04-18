package com.entseeker.repository;

import com.entseeker.model.Food;
import com.entseeker.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {

    List<Food> findByRestaurantId(Long restaurantId);

    @Query("SELECT f FROM Food f WHERE f.name LIKE %:keyword% OR f.foodCategory.name LIKE %:keyword%")
    List<Food> searchFood(@Param("keyword") String keyword);

    @Query("SELECT f FROM Food f JOIN f.ingredients i WHERE i = :ingredient")
    List<Food> findByIngredientsContaining(IngredientsItem ingredient);
}
