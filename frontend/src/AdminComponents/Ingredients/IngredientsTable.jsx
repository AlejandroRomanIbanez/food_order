import React, { useEffect, useState } from "react";
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
import { Create, Delete, Edit } from "@mui/icons-material";
import CreateFormModal from "../FormModal/CreateFormModal";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIngredient,
  getIngredientsOfRestaurants,
  updateStockOfIngredient,
} from "../../State/Ingredients/Action";

const IngredientsTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  console.log("ingredients", ingredients);

  useEffect(() => {
    dispatch(
      getIngredientsOfRestaurants({
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
      })
    );
  }, []);

  const handleClose = () => {
    setIsEdit(false);
    setOpen(false);
  };

  const handleUpdateStock = (id) => {
    dispatch(
      updateStockOfIngredient({
        jwt,
        ingredientId: id,
      })
    );
  };

  const handleDeleteIngredient = (id) => {
    dispatch(
      deleteIngredient({
        jwt,
        ingredientId: id,
      })
    );
  };

  const handleUpdateIngredient = (ingredient) => {
    setOpen(true);
    setSelectedIngredient(ingredient);
    setIsEdit(true);
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
                <TableCell align="right">Delete</TableCell>
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
                  <TableCell align="right">
                    <IconButton>
                      <Edit
                        onClick={() => handleUpdateIngredient(ingredient)}
                      />
                    </IconButton>
                    <IconButton>
                      <Delete
                        color="primary"
                        onClick={() => handleDeleteIngredient(ingredient.id)}
                      />
                    </IconButton>
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
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedUpdate={selectedIngredient}
      />
    </Box>
  );
};

export default IngredientsTable;
