import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createIngredient,
  updateIngredient,
} from "./../../State/Ingredients/Action";

const CreateIngredientForm = ({
  handleClose,
  isEdit,
  setIsEdit,
  selectedUpdate,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...formData,
      restaurantId: restaurant.usersRestaurants?.id,
    };
    const editedData = {
      ...formData,
      id: selectedUpdate.id,
    };

    if (isEdit) {
      delete editedData.categoryId;
      dispatch(updateIngredient({ ingredient: editedData, jwt }));
      setIsEdit(false);
    } else {
      dispatch(createIngredient({ ingredient: data, jwt }));
    }
    console.log(data);
    handleClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          {isEdit ? "Edit Ingredient" : "Create Ingredient"}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            onChange={handleInputChange}
            value={FormData.category}
          ></TextField>
          {!isEdit && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.ingredientCategoryId}
                name="categoryId"
                label="Category"
                onChange={handleInputChange}
              >
                {ingredients.category.map((category) => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <div className="flex justify-center">
            <Button variant="contained" type="submit">
              {isEdit ? "Edit Ingredient" : "Create Ingredient"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
