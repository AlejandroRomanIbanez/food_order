import React, { useEffect } from "react";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../State/Restaurant/Action";

const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  console.log("restaurant", restaurant);

  useEffect(() => {
    dispatch(getAllEvents(jwt));
  }, []);

  return (
    <div className="mt-5 px-5 flex flex-wrap gap-5">
      {restaurant.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
