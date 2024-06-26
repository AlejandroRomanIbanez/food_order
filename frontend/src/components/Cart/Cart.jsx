import { Divider } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import NewAddressCard from "./NewAddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../State/Order/Action";
import restaurantReducer from "./../../State/Restaurant/Reducer";

const Cart = () => {
  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const restaurantId = cart.cartItems[0]?.food.restaurant.id;
  const jwt = localStorage.getItem("jwt");
  const taxCharge = 5;
  const deliverCharge = 4;
  const calculatedTotalPrice = cart?.cart?.total + taxCharge + deliverCharge;
  console.log("totalPrice: ", calculatedTotalPrice);
  console.log("AuthCart: ", auth);
  const createOrderUsingSelectedAddress = (address) => {
    if (calculatedTotalPrice) {
      dispatch(
        createOrder({
          order: {
            address: address,
            restaurantId: restaurantId,
          },
          totalPrice: calculatedTotalPrice,
          jwt: jwt,
        })
      );
    }
  };

  console.log("Cart: ", cart);

  return (
    <div>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem item={item} />
          ))}

          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>{cart.cart?.total}€</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>{deliverCharge}€</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Tax and Restaurant Charges</p>
                <p>{taxCharge}€</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total pay</p>
              <p>{cart.cart?.total + taxCharge + deliverCharge}€</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0 ">
          <div>
            <h1 className="text-center text-2xl font-semibold py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {auth.user?.addresses?.map((address) => (
                <AddressCard
                  handleSelectAddress={() => createOrderUsingSelectedAddress()}
                  address={address}
                  showButton={true}
                />
              ))}
              <NewAddressCard cart={cart} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Cart;
