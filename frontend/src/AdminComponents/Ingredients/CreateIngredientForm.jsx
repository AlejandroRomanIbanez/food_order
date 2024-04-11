import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateIngredientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredientCategoryId: "",
  });
  const handleSubmit = () => {
    const data = {
      name: formData.categoryName,
      restaurantId: { id: 1 },
    };
    console.log(data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Ingredient Name"
            variant="outlined"
            onChange={handleInputChange}
            value={FormData.category}
          ></TextField>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.ingredientCategoryId}
              name="ingredientCategoryId"
              label="Category"
              onChange={handleInputChange}
            >
              <MenuItem value={"Burger"}>Burger</MenuItem>
              <MenuItem value={"Pizza"}>Pizza</MenuItem>
              <MenuItem value={"Fries"}>Fries</MenuItem>
            </Select>
          </FormControl>
          <div className="flex justify-center">
            <Button variant="contained" type="submit">
              Create Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
