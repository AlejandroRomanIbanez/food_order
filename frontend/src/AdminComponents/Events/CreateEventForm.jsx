import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { createEventAction } from "../../State/Restaurant/Action";

const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const CreateEventForm = ({ handleClose }) => {
  const [formData, setFormData] = useState(initialValues);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder } = useSelector((store) => store);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedData = {
      ...formData,
      startedAt: formData.startedAt
        ? dayjs(formData.startedAt).toISOString()
        : null,
      endsAt: formData.endsAt ? dayjs(formData.endsAt).toISOString() : null,
    };

    console.log("formattedData: ", formattedData);

    dispatch(
      createEventAction({
        data: formattedData,
        jwt,
        restaurantId: restaurant.usersRestaurants?.id,
      })
    );
    setFormData(initialValues);
    handleClose();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, dateType) => {
    setFormData({ ...formData, [dateType]: date });
  };

  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Category
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="image"
                name="image"
                label="Image URL"
                variant="outlined"
                onChange={handleFormChange}
                value={formData.image}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                variant="outlined"
                onChange={handleFormChange}
                value={formData.location}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Event Name"
                variant="outlined"
                onChange={handleFormChange}
                value={formData.handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Time"
                  className="w-full"
                  sx={{ width: "100%" }}
                  value={formData.startedAt}
                  onChange={(newValue) =>
                    handleDateChange(newValue, "startedAt")
                  }
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="End Time"
                  className="w-full"
                  sx={{ width: "100%" }}
                  value={formData.endsAt}
                  onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <div className="flex justify-center">
            <Button variant="contained" type="submit">
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;
