import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavorites } from "../../State/Authentication/Action";
import { isPresentInFavorites } from "../config/logic";
import { useSelector } from "react-redux";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleAddToFavorites = () => {
    dispatch(addToFavorites({ restaurantId: restaurant.id, jwt }));
  };

  const handleNavigateToRestaurant = () => {
    if (restaurant.open) {
      navigate(
        `/restaurant/${restaurant.address.city}/${restaurant.name}/${restaurant.id}`
      );
    }
  };

  return (
    <Card className="w-[18rem] ">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={restaurant.images[0]}
          alt="Indian restaurant"
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={restaurant.open ? "success" : "error"}
          label={restaurant.open ? "Open" : "Closed"}
        />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p
            onClick={handleNavigateToRestaurant}
            className="font-semibold text-lg cursor-pointer"
          >
            {restaurant.name}
          </p>
          <p className="text-gray-500 text-sm">{restaurant.description}</p>
        </div>
        <div>
          <IconButton onClick={handleAddToFavorites}>
            {isPresentInFavorites(auth.favorites, restaurant) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
