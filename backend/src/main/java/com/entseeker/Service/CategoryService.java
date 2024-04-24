package com.entseeker.Service;

import com.entseeker.model.Category;

import java.util.List;

public interface CategoryService {

    public Category createCategory(String name, Long userId) throws Exception;

    public List<Category> findCategoryByRestaurantId(Long userId) throws Exception;

    public Category findCategoryById(Long id) throws Exception;

    public void deleteCategory(Long id) throws Exception;

    public Category updateCategory(Long id, String name) throws Exception;
}
