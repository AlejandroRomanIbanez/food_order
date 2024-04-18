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
} from "@mui/material";
import { Create, Delete } from "@mui/icons-material";
import CreateFormModal from "../FormModal/CreateFormModal";
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIngredientCategory,
  getIngredientCategory,
} from "../../State/Ingredients/Action";

const orders = [1, 1, 1, 1, 1, 1, 1];

const IngredientsCategoryTable = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { restaurant, ingredients } = useSelector((store) => store);

  useEffect(() => {
    dispatch(
      getIngredientCategory({
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
      })
    );
  }, []);

  const handleDeleteIngredientCategory = (id) => {
    dispatch(
      deleteIngredientCategory({
        jwt,
        categoryId: id,
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
          title="Ingredients Category"
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.category.map((category) => (
                <TableRow
                  key={category.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.id}
                  </TableCell>
                  <TableCell align="left">{category.name}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Delete
                        color="primary"
                        onClick={() =>
                          handleDeleteIngredientCategory(category.id)
                        }
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
        formComponent={CreateIngredientCategoryForm}
      />
    </Box>
  );
};

export default IngredientsCategoryTable;
