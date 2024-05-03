import React from "react";
import AddressCard from "../Cart/AddressCard";
import NewAddressCard from "../Cart/NewAddressCard";
import { useSelector } from "react-redux";

const Address = () => {
  const { auth } = useSelector((store) => store);
  console.log("authAddress", auth);

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold py-10">
        Your Saved Addresses
      </h1>
      <div className="flex gap-5 flex-wrap justify-center">
        {auth.user?.addresses?.map((address) => (
          <AddressCard address={address} showButton={false} />
        ))}
        <NewAddressCard />
      </div>
    </div>
  );
};

export default Address;
