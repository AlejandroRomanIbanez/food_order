import { Divider } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import NewAddressCard from "./NewAddressCard";

const items = [1, 1, 1, 1];

const Cart = () => {
  const createOrderUsingSelectedAddress = () => {
    console.log("createOrderUsingSelectedAddress");
  };
  return (
    <div>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {items.map((item) => (
            <CartItem key={item} />
          ))}

          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>43€</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>3€</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Tax and Restaurant Charges</p>
                <p>3€</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total pay</p>
              <p>49€</p>
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
              {[1, 1, 1, 1, 1].map((item) => (
                <AddressCard
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              <NewAddressCard />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Cart;
