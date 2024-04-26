import React, { useState } from "react";
import { Card } from "@mui/material";
import {
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import OrdersTable from "./OrdersTable";

const OrderStatus = [
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Out for delivery",
    value: "OUT_FOR_DELIVERY",
  },
  {
    label: "All",
    value: "ALL",
  },
];

const Orders = () => {
  const [filterValue, setFilterValue] = useState("ALL");

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="px-2">
      <Card className="p-5">
        <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
          Order Status
        </Typography>
        <FormControl>
          <RadioGroup
            row
            name="category"
            value={filterValue || "all"}
            onChange={handleFilter}
          >
            {OrderStatus.map((item) => (
              <FormControlLabel
                key={item.label}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "gray" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>
      <OrdersTable filterValue={filterValue} />
    </div>
  );
};

export default Orders;
