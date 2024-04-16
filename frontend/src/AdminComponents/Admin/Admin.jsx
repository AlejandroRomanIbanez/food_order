import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./../Dashborad/Dashboard";
import Orders from "./../Orders/Orders";
import Menu from "./../Menu/Menu";
import FoodCategory from "./../FoodCategory/FoodCategory";
import Ingredients from "./../Ingredients/Ingredients";
import Events from "./../Events/Events";
import RestaurantDetails from "./RestaurantDetails";
import CreateMenuForm from "../Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsCategory } from "../../State/Restaurant/Action";
import { fetchRestaurantsOrder } from "./../../State/RestaurantOrder/Action";

const Admin = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  console.log("restaurant in", restaurant);

  const handleOnClose = () => {};

  useEffect(() => {
    dispatch(
      getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
      })
    );
    dispatch(
      fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
        orderStatus: restaurant.usersRestaurants?.orderStatus,
      })
    );
  }, []);

  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSidebar handleOnClose={handleOnClose} />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/category" element={<FoodCategory />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/events" element={<Events />} />
            <Route path="/details" element={<RestaurantDetails />} />
            <Route path="/add-menu" element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
