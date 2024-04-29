import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeCartItem, updateCartItem } from "../../State/Cart/Action";

const CartItem = ({ item }) => {
  const navigate = useNavigate();
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleUpdateCartItem = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
    }
    const data = {
      cartItemId: item.id,
      quantity: item.quantity + value,
    };
    dispatch(updateCartItem({ jwt, data }));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ jwt: auth.jwt || jwt, cartItemId: item.id }));
  };

  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:spaces-x-5">
        <div className="mr-4">
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={item.food.images[0]}
            alt={item.food.name}
          />
        </div>
        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{item.food.name}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <div className="w-5 h-5 text-xs items-center justify-center">
                  {item.quantity}
                </div>
                <IconButton onClick={() => handleUpdateCartItem(1)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <p>{item.totalPrice}€</p>
        </div>
      </div>
      <div className="pt-3 space-x-2">
        {item.ingredients.map((ingredient) => (
          <Chip label={ingredient} />
        ))}
      </div>
    </div>
  );
};

export default CartItem;
