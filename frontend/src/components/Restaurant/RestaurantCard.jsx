import { Card, Chip } from "@mui/material";
import React from "react";

const RestaurantCard = () => {
  return (
    <Card className="m-5 w-[18rem] ">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src="https://images.pexels.com/photos/18090414/pexels-photo-18090414/free-photo-of-decoration-in-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="restaurant"
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={true ? "success" : "error"}
          label={true ? "Open Now" : "Closed"}
        />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-lg"></p>
          <p className="text-gray-500 text-sm"> </p>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
