import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";
import RestaurantDetails from "../components/Restaurant/RestaurantDetails";
import Cart from "../components/Cart/Cart";
import Auth from "../components/Auth/Auth";
import PaymentSucess from "../components/PaymentSucess/PaymentSucess";

const CustomerRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:register" element={<Home />} />
        <Route
          path="/restaurant/:city/:title/:id"
          element={<RestaurantDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/payment/success/:id" element={<PaymentSucess />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default CustomerRoute;
