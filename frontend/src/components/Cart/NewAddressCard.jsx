import { Box, Button, Card, Grid, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "./../../State/Order/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

// const validationSchema = Yup.object.shape({
//   streetAddress: Yup.string().required("Street Address is required"),
//   state: Yup.string().required("State is required"),
//   pincode: Yup.string().required("Pincode is required"),
//   city: Yup.string().required("City is required"),
// });

const NewAddressCard = ({ cart }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          country: "Spain",
        },
      },
    };
    dispatch(createOrder(data));
    console.log("Form Values: ", values);
  };

  const handleOpenAddressModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
        <Card className="flex gap-5 w-64 p-5">
          <AddLocationAltIcon />
          <div className="space-y-3 text-gray-500">
            <h1 className="font-semibold text-lg text-white">
              Add New Address
            </h1>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleOpenAddressModal}
            >
              Add
            </Button>
          </div>
        </Card>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //     {(msg) => <span className="text-red-600">{msg}</span>}
                    //   </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add Address
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default NewAddressCard;
