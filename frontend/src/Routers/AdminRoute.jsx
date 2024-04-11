import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import CreateRestaurantForm from "../AdminComponents/CreateRestaurantForm/CreateRestaurantForm";
import Admin from "../AdminComponents/Admin/Admin";

const AdminRoute = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={false ? <CreateRestaurantForm /> : <Admin />}
        />
      </Routes>
    </div>
  );
};

export default AdminRoute;
