package com.entseeker.request;

import com.entseeker.model.Category;
import com.entseeker.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class UpdateFoodRequest {

    private String name;
    private String description;
    private Long price;
    private Category category;
    private List<String> images;
    private boolean vegetarian;
    private boolean seasonal;
    private List<IngredientsItem> ingredients;
}
