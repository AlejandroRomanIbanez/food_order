import { Grid } from "@mui/material";
import React from "react";
import MenuTable from "./../Menu/MenuTable";
import OrdersTable from "../Orders/OrdersTable";

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <MenuTable />
      </Grid>
      <Grid item xs={12} lg={6}>
        <OrdersTable />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
