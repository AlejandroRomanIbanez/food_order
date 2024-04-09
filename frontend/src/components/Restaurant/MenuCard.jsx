import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { categorizeIngredients } from "../util/categorizeIngredients";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../State/Cart/Action";

const MenuCard = ({ food }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();

  const handleCheckBoxChange = (ingredientName) => {
    if (selectedIngredients.includes(ingredientName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== ingredientName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredientName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      jwt: localStorage.getItem("jwt"),
      cartItem: {
        foodId: food.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    console.log("reqData", reqData);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={food.images[0]}
              alt={food.name}
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{food.name}</p>
              <p>{food.price}€</p>
              <p className="text-gray-400">{food.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizeIngredients(food.ingredients)).map(
              (category) => (
                <div>
                  <p>{category}</p>
                  <FormGroup>
                    {categorizeIngredients(food.ingredients)[category].map(
                      (ingredient) => (
                        <FormControlLabel
                          key={ingredient.id}
                          control={
                            <Checkbox
                              onChange={() =>
                                handleCheckBoxChange(ingredient.name)
                              }
                            />
                          }
                          label={ingredient.name}
                        />
                      )
                    )}
                  </FormGroup>
                </div>
              )
            )}
          </div>
          <div className="pt-5">
            <Button type="submit" variant="contained" disabled={false}>
              {true ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
