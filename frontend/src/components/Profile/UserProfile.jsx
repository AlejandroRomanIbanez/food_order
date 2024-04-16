import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Authentication/Action";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 text-2xl font-semibold">Welcome Alex</h1>
        <p>Email: Alex@gmail.com</p>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ margin: "2rem 0rem" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
