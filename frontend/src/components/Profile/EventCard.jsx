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

const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <CardContent>
          <Typography variant="h5">American Fast Food</Typography>
          <Typography variant="body2">35% on your first order</Typography>
          <div className="py-2 space-y-2">
            <p>Spain</p>
            <p className="text-sm text-blue-500">{new Date().toDateString()}</p>
            <p>
              <p className="text-sm text-red-500">
                {new Date(
                  new Date().setDate(new Date().getDate() + 7)
                ).toDateString()}
              </p>
            </p>
          </div>
        </CardContent>
        {false && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
