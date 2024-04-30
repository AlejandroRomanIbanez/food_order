import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from "../../State/RestaurantOrder/Action";

const orderStatus = [
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Out For Delivery",
    value: "OUT_FOR_DELIVERY",
  },
  {
    label: "Delivered",
    value: "DELIVERED",
  },
];

const OrdersTable = ({ filterValue }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState({});
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
        orderStatus: restaurant.usersRestaurants?.orderStatus,
      })
    );
  }, []);

  const handleClick = (event, orderId) => {
    setAnchorEl({ ...anchorEl, [orderId]: event.currentTarget });
  };

  const handleClose = (orderId) => {
    setAnchorEl({ ...anchorEl, [orderId]: null });
  };

  const handleUpdateOrderStatus = (orderId, orderStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
    handleClose(orderId);
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader title="All Orders" sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders
                ?.filter((order) =>
                  filterValue === "ALL"
                    ? true
                    : order.orderStatus === filterValue
                )
                .map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="right">
                      <AvatarGroup>
                        {order.items?.map((orderItem, index) => (
                          <Avatar key={index} src={orderItem.food.images[0]} />
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="right">
                      {order.customer.fullName}
                    </TableCell>
                    <TableCell align="right">{order.totalPrice}€</TableCell>
                    <TableCell align="right">
                      {order.items.map((orderItem, index) => (
                        <p key={index}>{orderItem.food?.name}</p>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {order.items.map((orderItem, index) => (
                        <div key={index}>
                          {orderItem.ingredients?.map((ingredient, index) => (
                            <Chip key={index} label={ingredient}></Chip>
                          ))}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell align="right">{order.orderStatus}</TableCell>
                    <TableCell align="right">
                      <Button
                        id={`basic-button-${order.id}`}
                        aria-controls={`basic-menu-${order.id}`}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => handleClick(e, order.id)}
                      >
                        Update
                      </Button>
                      <Menu
                        id={`basic-menu-${order.id}`}
                        anchorEl={anchorEl[order.id]}
                        open={Boolean(anchorEl[order.id])}
                        onClose={() => handleClose(order.id)}
                        MenuListProps={{
                          "aria-labelledby": `basic-button-${order.id}`,
                        }}
                      >
                        {console.log("orderAdmin", order)}
                        {orderStatus.map((status) => (
                          <MenuItem
                            key={status.value}
                            onClick={() =>
                              handleUpdateOrderStatus(order.id, status.value)
                            }
                          >
                            {status.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default OrdersTable;
