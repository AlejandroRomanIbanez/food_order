package com.entseeker.Service;


import com.entseeker.model.IngredientCategory;
import com.entseeker.model.IngredientsItem;

import java.util.List;

public interface IngredientsService {

    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;

    public IngredientCategory findIngredientCategoryById(Long id) throws Exception;

    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception;

    public IngredientsItem createIngredientsItem(Long restaurantId, String IngredientName,
                                                 Long categoryId) throws Exception;

    public List<IngredientsItem> findRestaurantsIngredients(Long restaurantId);

    public IngredientsItem updateStock(Long id) throws Exception;
}
