package com.entseeker.repository;

import com.entseeker.model.IngredientCategory;
import com.entseeker.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IngredientCategoryRepository extends JpaRepository<IngredientCategory, Long> {

    List<IngredientCategory> findByRestaurantId(Long restaurantId);

    @Query("SELECT i FROM IngredientsItem i WHERE i.category.id = :categoryId")
    List<IngredientsItem> findByCategoryId(@Param("categoryId") Long categoryId);
}
