import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateIngredientCategoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleSubmit = () => {
    const data = {
      name: formData.categoryName,
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
          Create Ingredient Category
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
              Create Category
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
