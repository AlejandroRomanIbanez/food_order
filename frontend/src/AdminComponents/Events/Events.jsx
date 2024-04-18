import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateFormModal from "../FormModal/CreateFormModal";
import CreateEventForm from "./CreateEventForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  getRestaurantsEvents,
  updateEvent,
} from "../../State/Restaurant/Action";
import EventCard from "../../components/Profile/EventCard";

const Events = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  const [isEdit, setIsEdit] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  console.log("restaurant", restaurant);
  console.log("editingEvent", editingEvent);

  useEffect(() => {
    dispatch(
      getRestaurantsEvents({
        restaurantId: restaurant.usersRestaurants?.id,
        jwt,
      })
    );
  }, []);

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setEditingEvent(null);
  };
  const handleDeleteEvent = (eventId) => {
    dispatch(deleteEvent({ eventId, jwt }));
  };

  const handleEditEvent = (event) => {
    setOpen(true);
    setEditingEvent(event);
    setIsEdit(true);
    console.log("Editing event:", event);
  };

  return (
    <>
      <div className="mt-5 px-5 flex justify-center flex-wrap gap-5">
        {restaurant.restaurantsEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isAdmin={true}
            handleDeleteEvent={() => handleDeleteEvent(event.id)}
            handleEditEvent={() => handleEditEvent(event)}
          />
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
          isEdit={isEdit}
          cartEvent={editingEvent}
          setIsEdit={setIsEdit}
        />
      </div>
    </>
  );
};

export default Events;
