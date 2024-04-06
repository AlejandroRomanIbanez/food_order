import React from "react";
import { Card, Button } from "@mui/material";

const OrderCard = () => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img
          className="h-16 w-16"
          src="https://cdn.pixabay.com/photo/2023/10/08/13/03/ai-generated-8302142_960_720.jpg"
          alt=""
        />
        <div>
          <p>Burguer</p>
          <p>49€</p>
        </div>
      </div>
      <div>
        <Button sx={{ cursor: "not-allowed" }}>Completed</Button>
      </div>
    </Card>
  );
};

export default OrderCard;
