package com.entseeker.controller;

import com.entseeker.Service.IngredientsService;
import com.entseeker.Service.UserService;
import com.entseeker.model.IngredientCategory;
import com.entseeker.model.IngredientsItem;
import com.entseeker.model.User;
import com.entseeker.request.IngredientCategoryRequest;
import com.entseeker.request.IngredientRequest;
import com.entseeker.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/ingredients")
public class IngredientController {

    @Autowired
    private IngredientsService ingredientsService;

    private UserService userService;

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(@RequestBody IngredientCategoryRequest req)
            throws Exception {

        IngredientCategory item = ingredientsService.createIngredientCategory(req.getName(), req.getRestaurantId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<IngredientsItem> createIngredientItem(@RequestBody IngredientRequest req)
            throws Exception {

        IngredientsItem item = ingredientsService.createIngredientsItem(req.getRestaurantId(),
                req.getName(), req.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<IngredientsItem> updateIngredientStock(@PathVariable Long id)
            throws Exception {

        IngredientsItem item = ingredientsService.updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<IngredientsItem>> getRestaurantIngredient(@PathVariable Long restaurantId)
            throws Exception {

        List<IngredientsItem> items = ingredientsService.findRestaurantsIngredients(restaurantId);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}/category")
    public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory(@PathVariable Long restaurantId)
            throws Exception {

        List<IngredientCategory> items = ingredientsService.findIngredientCategoryByRestaurantId(restaurantId);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteIngredientById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id) throws Exception {

        ingredientsService.deleteIngredientById(id);

        MessageResponse res = new MessageResponse();
        res.setMessage("Deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);

    }
    @DeleteMapping("/category/{id}")
    public ResponseEntity<MessageResponse> deleteIngredientCategoryById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id) throws Exception {

        ingredientsService.deleteIngredientCategoryById(id);

        MessageResponse res = new MessageResponse();
        res.setMessage("Deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);

    }
}
