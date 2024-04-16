import React, { useEffect } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardHeader,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantsOrder } from "../../State/RestaurantOrder/Action";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients, menu, restaurantOrder } = useSelector(
    (store) => store
  );

  useEffect(() => {
    dispatch(
      fetchRestaurantsOrder({
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
        orderStatus: restaurant.usersRestaurants?.orderStatus,
      })
    );
  }, []);

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
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders?.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {order.items?.map((orderItem) => (
                        <Avatar src={orderItem.food.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{order.customer.fullName}</TableCell>
                  <TableCell align="right">{order.totalPrice}€</TableCell>
                  <TableCell align="right">
                    {order.items.map((orderItem) => (
                      <p>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {order.items.map((orderItem) => (
                      <div>
                        {orderItem.ingredients?.map((ingredient) => (
                          <Chip label={ingredient}></Chip>
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{order.orderStatus}</TableCell>
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
