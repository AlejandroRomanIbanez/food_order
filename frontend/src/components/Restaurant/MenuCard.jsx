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
import React from "react";

const ingredients = [
  {
    category: "Nunts & Seeds",
    ingredients: ["Cashews"],
  },
  {
    category: "Protein",
    ingredients: ["Ground Beef", "Bacon strips"],
  },
];

const MenuCard = () => {
  const handleCheckBoxChange = (value) => {
    console.log(value);
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
              src="https://cdn.pixabay.com/photo/2023/10/08/13/03/ai-generated-8302142_960_720.jpg"
              alt="Burger"
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">Burguer</p>
              <p>13€</p>
              <p className="text-gray-400">
                Perfect meat burguer with cheese and fries
              </p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form action="">
          <div className="flex gap-5 flex-wrap">
            {ingredients.map((ingredient) => (
              <div>
                <p>{ingredient.category}</p>
                <FormGroup>
                  {ingredient.ingredients.map((ingredient) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={() => handleCheckBoxChange(ingredient)}
                        />
                      }
                      label={ingredient}
                      key={ingredient}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
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
