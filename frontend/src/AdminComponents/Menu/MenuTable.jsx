import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Chip,
  Button,
} from "@mui/material";
import { Create, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFood,
  getMenuItemsByRestaurantId,
  updateMenuItemsAvailability,
} from "../../State/Menu/Action";

const MenuTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, menu } = useSelector((store) => store);
  console.log("menu", menu);

  const handleNavigateCreateMenu = () => {
    navigate("/admin/restaurant/add-menu");
  };

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurants?.id,
        jwt,
        vegetarian: false,
        nonveg: false,
        seasonal: false,
      })
    );
  }, []);

  const handleDeleteMenuItem = (foodId) => {
    dispatch(deleteFood({ foodId, jwt }));
  };

  const handleUpdateMenuItemsAvailability = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId: foodId, jwt }));
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton
              onClick={handleNavigateCreateMenu}
              aria-label="settings"
            >
              <Create />
            </IconButton>
          }
          title="Menu"
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Availability</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems?.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={item.images[0]} />
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">
                    {item.ingredients?.map((ingredient) => (
                      <Chip key={ingredient.id} label={ingredient.name} />
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.price}€</TableCell>
                  <TableCell align="right">
                    <Button
                      color={item.available ? "success" : "error"}
                      onClick={() => handleUpdateMenuItemsAvailability(item.id)}
                    >
                      {item.available ? "Available" : "Not Available"}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    {
                      <IconButton>
                        <Delete
                          color="primary"
                          onClick={() => handleDeleteMenuItem(item.id)}
                        />
                      </IconButton>
                    }
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

export default MenuTable;
