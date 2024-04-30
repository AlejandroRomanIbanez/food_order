import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OrderCard = ({ orders }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {orders.map((order) => (
        <Accordion
          key={order.id}
          expanded={expanded === `panel${order.id}`}
          onChange={handleChange(`panel${order.id}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex justify-between items-center w-full">
              <p>{order.id}</p>
              <p>{order.orderStatus}</p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {order.items.map((item) => (
              <Card
                key={item.id}
                className="flex justify-between items-center p-5 w-full"
              >
                <div className="flex items-center space-x-5">
                  <img
                    className="h-16 w-16"
                    src={item.food.images[0]}
                    alt={item.food.name}
                  />
                  <div>
                    <p>{item.food.name}</p>
                    <p>{item.totalPrice}€</p>
                  </div>
                </div>
                <div>
                  <Button sx={{ cursor: "not-allowed" }}>
                    {order.orderStatus}
                  </Button>
                </div>
              </Card>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default OrderCard;
