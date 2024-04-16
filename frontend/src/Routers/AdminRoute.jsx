import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import CreateRestaurantForm from "../AdminComponents/CreateRestaurantForm/CreateRestaurantForm";
import Admin from "../AdminComponents/Admin/Admin";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { restaurant } = useSelector((store) => store);
  console.log("restaurant", restaurant);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !restaurant.usersRestaurants ? <CreateRestaurantForm /> : <Admin />
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRoute;
