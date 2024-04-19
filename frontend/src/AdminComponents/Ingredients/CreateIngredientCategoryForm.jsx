import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createIngredientCategory,
  updateIngredientCategory,
} from "../../State/Ingredients/Action";

const CreateIngredientCategoryForm = ({
  handleClose,
  isEdit,
  setIsEdit,
  selectedUpdate,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.name,
      restaurantId: restaurant.usersRestaurants?.id,
    };
    const editedData = {
      name: formData.name,
      id: selectedUpdate.id,
    };
    console.log(formData);

    if (isEdit) {
      dispatch(updateIngredientCategory({ category: editedData, jwt }));
      setIsEdit(false);
    } else {
      dispatch(createIngredientCategory({ category: data, jwt }));
    }
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
          {isEdit ? "Edit Ingredient Category" : "Create Ingredient Category"}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Ingredient Category"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          ></TextField>
          <div className="flex justify-center">
            <Button variant="contained" type="submit">
              {isEdit ? "Edit Category" : "Create Category"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
