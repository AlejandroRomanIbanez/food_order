import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import React, { useState } from "react";
import MenuCard from "./MenuCard";

const categories = ["Pizza", "Burguer", "Sandwich", "Sushi", "Dessert"];

const foodTypes = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Vegetarian",
    value: "vegetarian",
  },
  {
    label: "Non-Vegetarian",
    value: "non-vegetarian",
  },
  {
    label: "Seasonal",
    value: "seasonal",
  },
];

const menu = [1, 1, 1, 1, 1, 1];

const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("all");

  const handleFilter = (event) => {
    console.log(event.target.value, event.target.name);
  };

  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home/spain/indian fast food/3
        </h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src="https://images.pexels.com/photos/18090414/pexels-photo-18090414/free-photo-of-decoration-in-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src="https://images.pexels.com/photos/18090414/pexels-photo-18090414/free-photo-of-decoration-in-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src="https://images.pexels.com/photos/18090414/pexels-photo-18090414/free-photo-of-decoration-in-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">Indian Fast Food</h1>
          <p className="text-gray-500 mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            dicta maxime molestias deserunt suscipit, ut earum ad placeat, enim
            repellat ducimus, veritatis facilis temporibus ea ex dolorem
            distinctio quasi iure!
          </p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>Alicante, Alicante</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarTodayIcon />
              <span>Mon-Sun: 9:00 AM - 9:00 PM (Today)</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter ">
          <div className="box space-y-5 lg:sticky top-28 p-5 shadow-md">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilter}
                  name="food_type"
                  value={foodType}
                >
                  {foodTypes.map((foodType) => (
                    <FormControlLabel
                      value={foodType.value}
                      key={foodType.value}
                      control={<Radio />}
                      label={foodType.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilter}
                  name="food_type"
                  value={foodType}
                >
                  {categories.map((foodCategory) => (
                    <FormControlLabel
                      value={foodCategory}
                      key={foodCategory}
                      control={<Radio />}
                      label={foodCategory}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu.map((item) => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
