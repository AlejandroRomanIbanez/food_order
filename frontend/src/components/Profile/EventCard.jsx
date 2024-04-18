import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const EventCard = ({ event, isAdmin, handleDeleteEvent, handleEditEvent }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <Card sx={{ width: 345, position: "relative" }}>
        <CardMedia sx={{ height: 345 }} image={event.image} />
        <CardContent>
          <Typography variant="h5">{event.restaurant.name}</Typography>
          <Typography variant="body2">{event.name}</Typography>
          <div className="py-2 space-y-2">
            <p>{event.location}</p>
            <p className="text-sm text-blue-500">
              {formatDate(event.startedAt)}
            </p>
            <p>
              <p className="text-sm text-red-500">{formatDate(event.endsAt)}</p>
            </p>
            {isAdmin && (
              <CardActions sx={{ position: "absolute", bottom: 0, right: 0 }}>
                <IconButton onClick={() => handleEditEvent(event)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleDeleteEvent}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCard;
