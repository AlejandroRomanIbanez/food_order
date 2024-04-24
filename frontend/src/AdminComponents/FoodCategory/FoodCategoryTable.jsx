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
import { Create, Edit } from "@mui/icons-material";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import CreateFormModal from "../FormModal/CreateFormModal";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsCategory } from "../../State/Restaurant/Action";

const orders = [1, 1, 1, 1, 1, 1, 1];

const FoodCategoryTable = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsEdit(false);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(
      getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
      })
    );
  }, []);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEdit(true);
    setOpen(true);
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
          title="Food Category"
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Edit/Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((category) => (
                <TableRow
                  key={category.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.id}
                  </TableCell>
                  <TableCell align="left">{category.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleEditCategory(category)}
                      aria-label="settings"
                    >
                      <Edit />
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
        formComponent={CreateFoodCategoryForm}
        isEdit={isEdit}
        selectedUpdate={selectedCategory}
        setIsEdit={setIsEdit}
      />
    </Box>
  );
};

export default FoodCategoryTable;
