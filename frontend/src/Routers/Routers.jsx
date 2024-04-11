import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/admin/restaurant/*" element={<AdminRoute />}></Route>
      <Route path="/*" element={<CustomerRoute />}></Route>
    </Routes>
  );
};

export default Routers;
