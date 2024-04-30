import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsersOrders } from "../../State/Order/Action";

const Orders = () => {
  const navigate = useNavigate();
  const { auth, cart, order } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const groupedOrders = {};

  useEffect(() => {
    dispatch(getUsersOrders(jwt));
  }, [auth.jwt]);

  order.orders.forEach((order) => {
    if (!groupedOrders[order.id]) {
      groupedOrders[order.id] = [];
    }
    groupedOrders[order.id].push(order);
  });

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
        {Object.keys(groupedOrders).map((orderId) => (
          <OrderCard key={orderId} orders={groupedOrders[orderId]} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
