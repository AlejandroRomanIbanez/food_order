package com.entseeker.controller;


import com.entseeker.Service.CategoryService;
import com.entseeker.Service.UserService;
import com.entseeker.model.Category;
import com.entseeker.model.User;
import com.entseeker.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category,
                                                   @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Category createdCategory = categoryService.createCategory(category.getName(), user.getId());

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/category/restaurant/{restaurantId}")
    public ResponseEntity<List<Category>> getRestaurantCategory(@PathVariable Long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        List<Category> categories = categoryService.findCategoryByRestaurantId(restaurantId);

        return new ResponseEntity<>(categories, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/category/{categoryId}")
    public ResponseEntity<MessageResponse> deleteCategory(@PathVariable Long categoryId,
                                                          @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        categoryService.deleteCategory(categoryId);
        MessageResponse res = new MessageResponse();
        res.setMessage("Category deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/admin/category/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long categoryId,
                                                          @RequestBody Map<String, String> requestBody,
                                                          @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        String name = requestBody.get("name");
        Category category = categoryService.updateCategory(categoryId, name);

        return new ResponseEntity<>(category, HttpStatus.CREATED);
                                                   }
}
