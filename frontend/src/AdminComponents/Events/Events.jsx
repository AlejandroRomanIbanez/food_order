import { Button } from "@mui/material";
import React from "react";
import CreateFormModal from "../FormModal/CreateFormModal";
import CreateEventForm from "./CreateEventForm";

const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-center">
      <div className="p-5">
        <Button onClick={handleOpen} variant="contained">
          Create New Event
        </Button>
        <CreateFormModal
          open={open}
          handleClose={handleClose}
          formComponent={CreateEventForm}
        />
      </div>
    </div>
  );
};

export default Events;
