import { Button } from "@mui/material";
import React, { useEffect } from "react";
import CreateFormModal from "../FormModal/CreateFormModal";
import CreateEventForm from "./CreateEventForm";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsEvents } from "../../State/Restaurant/Action";
import EventCard from "../../components/Profile/EventCard";

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  console.log("restaurant", restaurant);

  useEffect(() => {
    dispatch(
      getRestaurantsEvents({
        restaurantId: restaurant.usersRestaurants?.id,
        jwt,
      })
    );
  }, []);

  return (
    <>
      <div className="mt-5 px-5 flex justify-center flex-wrap gap-5">
        {restaurant.restaurantsEvents.map((event) => (
          <EventCard key={event.id} event={event} isAdmin={true} />
        ))}
      </div>
      <div className="p-5 flex justify-center">
        <Button onClick={handleOpen} variant="contained">
          Create New Event
        </Button>
        <CreateFormModal
          open={open}
          handleClose={handleClose}
          formComponent={CreateEventForm}
        />
      </div>
    </>
  );
};

export default Events;
