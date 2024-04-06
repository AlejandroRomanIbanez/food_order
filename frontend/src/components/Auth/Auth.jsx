import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "../Cart/NewAddressCard";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate("/");
  };

  return (
    <>
      <Modal
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login"
        }
        onClose={handleOnClose}
      >
        <Box sx={style}>
          {location.pathname === "/account/login" ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
