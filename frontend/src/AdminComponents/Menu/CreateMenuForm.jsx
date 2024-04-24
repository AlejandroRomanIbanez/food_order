import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Grid,
  CircularProgress,
  IconButton,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import { darkTheme } from "./../../Theme/DarkTheme";
import { uploadImageToCloudinary } from "../util/uploadToCloudaniry";
import Ingredients from "./../Ingredients/Ingredients";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem, updateMenuItem } from "./../../State/Menu/Action";
import { getIngredientsOfRestaurants } from "../../State/Ingredients/Action";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  nonveg: false,
  seasonal: false,
  ingredients: [],

  images: [],
};

const CreateMenuForm = ({ setIsEdit, isEdit, selectedFood }) => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  const navigate = useNavigate();
  console.log("selectedFood", selectedFood);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (isEdit) {
        values.id = selectedFood?.id;
        dispatch(updateMenuItem({ menuItem: values, jwt }));
        setIsEdit(false);
        return;
      }
      values.restaurantId = restaurant.usersRestaurants?.id;
      dispatch(createMenuItem({ menu: values, jwt }));
      console.log("data form:", values);
      navigate("/admin/restaurant/menu");
    },
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  useEffect(() => {
    dispatch(
      getIngredientsOfRestaurants({
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
      })
    );
  }, []);

  useEffect(() => {
    if (isEdit && selectedFood) {
      formik.setValues({
        name: selectedFood?.name,
        description: selectedFood?.description,
        price: selectedFood?.price,
        category: selectedFood?.foodCategory,
        vegetarian: selectedFood?.vegetarian,
        seasonal: selectedFood?.seasonal,
        ingredients: selectedFood?.ingredients,
        images: selectedFood?.images,
      });
    }
  }, [selectedFood]);

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">
          {isEdit ? "Edit Menu" : "Add New Menu"}
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="fileInput" className="relative">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                  <AddPhotoAlternate className="text-white" />
                </span>
                {uploadImage && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
                      src={image}
                      alt=""
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Close sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  name="category"
                  label="Category"
                  onChange={formik.handleChange}
                >
                  {restaurant.categories?.map((category) => (
                    <MenuItem key={category.id} value={category}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-label">
                  Ingredients
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  name="ingredients"
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Ingredients"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                >
                  {ingredients.ingredients?.map((ingredient) => (
                    <MenuItem key={ingredient.id} value={ingredient}>
                      {ingredient.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Is Seasonal
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.seasonal}
                  name="seasonal"
                  label="Is Seasonal"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Is Vegetarian
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.vegetarian}
                  name="vegetarian"
                  label="Is Vegetarian"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid className="flex justify-center">
            <Button variant="contained" type="submit" color="primary">
              {isEdit ? "Edit Menu" : "Create Menu"}
            </Button>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
