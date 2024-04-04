import React from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Badge, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { pink } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";

export const Navbar = () => {
  const theme = useTheme();

  return (
    <div className="px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li className="logo font-semibold text-gray-300 text-2xl">
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
          <Avatar sx={{ bgcolor: "white", color: pink.A400 }}>A</Avatar>
        </div>
        <div className="">
          <IconButton>
            <Badge
              badgeContent={3}
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
