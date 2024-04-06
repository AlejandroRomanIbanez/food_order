import React from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../State/Authentication/Action";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("Form Values: ", values);
    dispatch(registerUser({ userData: values, navigate }));
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Login
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <Field
            as={TextField}
            type="password"
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <Field
            fullWidth
            margin="normal"
            as={Select}
            name="role"
            label="Role"
            labelId="role-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Owner</MenuItem>
          </Field>

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?
        <Button
          size="small"
          onClick={() => {
            navigate("/account/login");
          }}
        >
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
