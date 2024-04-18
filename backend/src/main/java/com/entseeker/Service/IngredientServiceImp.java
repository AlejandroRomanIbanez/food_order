package com.entseeker.Service;

import com.entseeker.model.Food;
import com.entseeker.model.IngredientCategory;
import com.entseeker.model.IngredientsItem;
import com.entseeker.model.Restaurant;
import com.entseeker.repository.FoodRepository;
import com.entseeker.repository.IngredientCategoryRepository;
import com.entseeker.repository.IngredientItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientServiceImp implements IngredientsService {

    @Autowired
    private IngredientItemRepository ingredientItemRepository;

    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

        IngredientCategory category = new IngredientCategory();
        category.setRestaurant(restaurant);
        category.setName(name);


        return ingredientCategoryRepository.save(category);
    }

    @Override
    public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
        Optional<IngredientCategory> optional = ingredientCategoryRepository.findById(id);
        if(optional.isEmpty()) {
            throw new Exception("Ingredient Category not found");
        }
        return optional.get();
    }

    @Override
    public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception {
        restaurantService.findRestaurantById(restaurantId);
        return ingredientCategoryRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem createIngredientsItem(Long restaurantId, String IngredientName,
                                                 Long categoryId) throws Exception {
        Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
        IngredientCategory category = findIngredientCategoryById(categoryId);

        IngredientsItem item = new IngredientsItem();
        item.setRestaurant(restaurant);
        item.setName(IngredientName);
        item.setCategory(category);

        IngredientsItem ingredient = ingredientItemRepository.save(item);
        category.getIngredients().add(ingredient);
        return ingredient;
    }

    @Override
    public List<IngredientsItem> findRestaurantsIngredients(Long restaurantId) {
        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem updateStock(Long id) throws Exception {
        Optional<IngredientsItem> optionalIngredientsItem = ingredientItemRepository.findById(id);
        if(optionalIngredientsItem.isEmpty()) {
            throw new Exception("Ingredient not found");
        }
        IngredientsItem ingredientsItem = optionalIngredientsItem.get();
        ingredientsItem.setInStock(!ingredientsItem.isInStock());
        return ingredientItemRepository.save(ingredientsItem);
    }



    @Override
    public void deleteIngredientById(Long id) throws Exception {
        IngredientsItem ingredient = findIngredientsItemById(id);

        List<Food> foods = foodRepository.findByIngredientsContaining(ingredient);
        for (Food food : foods) {
            food.getIngredients().remove(ingredient);
            foodRepository.save(food);
        }

        ingredientItemRepository.delete(ingredient);
    }

    private IngredientsItem findIngredientsItemById(Long id) throws Exception {

        Optional<IngredientsItem> optional = ingredientItemRepository.findById(id);
        if(optional.isEmpty()) {
            throw new Exception("Ingredient not found");
        }
        return optional.get();
    }
}
