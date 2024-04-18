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
  Button,
} from "@mui/material";
import { Create } from "@mui/icons-material";
import CreateFormModal from "../FormModal/CreateFormModal";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientsOfRestaurants,
  updateStockOfIngredient,
} from "../../State/Ingredients/Action";

const IngredientsTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  console.log("ingredients", ingredients);

  useEffect(() => {
    dispatch(
      getIngredientsOfRestaurants({
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
      })
    );
  }, []);

  const handleUpdateStock = (id) => {
    dispatch(
      updateStockOfIngredient({
        jwt,
        ingredientId: id,
      })
    );
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <Create />
            </IconButton>
          }
          title="Ingredients"
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.ingredients?.map((ingredient) => (
                <TableRow
                  key={ingredient.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {ingredient.id}
                  </TableCell>
                  <TableCell align="right">{ingredient.name}</TableCell>
                  <TableCell align="right">
                    {ingredient.category?.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color={ingredient.inStock ? "success" : "error"}
                      onClick={() => handleUpdateStock(ingredient.id)}
                    >
                      {ingredient.inStock ? "Available" : "Not Available"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <CreateFormModal
        open={open}
        handleClose={handleClose}
        formComponent={CreateIngredientForm}
      />
    </Box>
  );
};

export default IngredientsTable;
