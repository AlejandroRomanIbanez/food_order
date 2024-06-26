import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  updateRestaurantCategory,
} from "../../State/Restaurant/Action";

const CreateFoodCategoryForm = ({
  handleClose,
  isEdit,
  setIsEdit,
  selectedUpdate,
}) => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [formData, setFormData] = useState({
    categoryName: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.categoryName,
      id: selectedUpdate?.id,
    };
    if (isEdit) {
      dispatch(updateRestaurantCategory({ data, jwt: jwt }));
      setIsEdit(false);
    } else {
      dispatch(createCategory({ reqData: data, jwt: jwt }));
    }
    handleClose();
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
          {isEdit ? "Edit Category" : "Create Category"}
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Food Category"
            variant="outlined"
            onChange={handleInputChange}
            value={FormData.category}
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

export default CreateFoodCategoryForm;
