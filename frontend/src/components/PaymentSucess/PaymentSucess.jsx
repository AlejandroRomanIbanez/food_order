import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentSucess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <Card className="box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5 ">
          <TaskAltIcon sx={{ fontSize: "5rem", color: "green" }} />
          <h1 className="text-2xl py-5 font-semibold">Payment Successfull</h1>
          <p className="py-3 text-center text-gray-400">
            Thank you for your order
          </p>
          <p className="py-2 text-center text-gray-200 text-lg">
            Your order will be delivered soon
          </p>
          <Button
            variant="contained"
            className="py-5"
            sx={{ margin: "1rem 0rem" }}
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSucess;
