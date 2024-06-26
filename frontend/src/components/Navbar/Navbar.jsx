import React from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Badge, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { auth, cart } = useSelector((store) => store);
  console.log("cartNavbar", cart);

  const handleLogin = () => {
    navigate("/account/login");
  };

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/profile");
    } else {
      navigate("/admin/restaurant");
    }
  };

  return (
    <div className="px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="logo font-semibold text-gray-300 text-2xl"
        >
          Alex's Food
        </li>
      </div>
      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="">
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>
        <div className="">
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              className="cursor-pointer"
              sx={{ bgcolor: "white", color: pink.A400 }}
            >
              {auth.user?.fullName[0]?.toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={handleLogin}>
              <Person />
            </IconButton>
          )}
        </div>
        <div className="">
          <IconButton onClick={() => navigate("/cart")}>
            <Badge
              badgeContent={cart.cart?.items.length}
              sx={{
                ".MuiBadge-badge": {
                  bgcolor: theme.palette.black.main,
                  color: "white",
                },
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
