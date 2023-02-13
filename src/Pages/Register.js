import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/login.scss";
import { axiosInstance } from "../Utils/jwtInterceptors";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
  const navigate = useNavigate()

  const submitForm = async (data) => {
    setIsLoading(true)
    let formData = new FormData();

    formData.append('first_name', data?.first_name)
    formData.append('last_name', data?.last_name)
    formData.append('email', data?.email)
    formData.append('password', data?.password)
    formData.append('password2', data?.password2)

    try {
      const { response } = await axiosInstance.post("register/", formData);
        setIsLoading(false)
        navigate('/login')
        reset()
      
    } catch (error) {
      const data = error?.response?.data;
      setError("email", { type: "focus", message: data['email'] });
      setError("password", { type: "focus", message: data['password'] });
      setError("password2", { type: "focus", message: data['password2'] });
      setIsLoading(false)
    }
  }


  return (
    <Box className="uppercontainer">
      <Container className="container">
        <Typography variant="h3" className="heading">
          Register
        </Typography>
        <Box className="formUpperContainer">
          <FormControl className="formcontainer" onSubmit={handleSubmit(submitForm)}>
            <Box className="alignRow">
              <TextField
                {...register("first_name", {
                  required: 'First name is required.'
                })}
                name="first_name"
                label="First Name"
                placeholder="First Name"
                size="small"
                error={errors?.first_name ? true : false}
                helperText={errors?.first_name && errors?.first_name.message}
              />
              <TextField
                {...register("last_name", {
                  required: 'Last name is required.'
                })}
                name="last_name"
                label="Last Name"
                placeholder="Last Name"
                size="small"
                error={errors?.last_name ? true : false}
                helperText={errors?.last_name && errors?.last_name.message}
              />
            </Box>
            <TextField
              {...register("email", {
                required: 'Email name is required.'
              })}
              name="email"
              label="Email"
              placeholder="Email"
              size="small"
              error={errors?.email ? true : false}
              helperText={errors?.email && errors?.email.message}
            />
            <Box className="alignRow">
              <TextField
                {...register("password", {
                  required: 'Password name is required.'
                })}
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                size="small"
                error={errors?.password ? true : false}
                helperText={errors?.password && errors?.password.message}
              />
              <TextField
                {...register("password2", {
                  required: 'Confirm Password name is required.'
                })}
                type="password"
                name="password2"
                label="Confirm Password"
                placeholder="Confirm Password"
                size="small"
                error={errors?.password2 ? true : false}
                helperText={errors?.password2 && errors?.password2.message}
              />
            </Box>

            <Button variant="contained" onClick={handleSubmit(submitForm)}>{isLoading ? 'Registering...' : 'Register'}</Button>
            <Typography className="smallText">
              Already have an account? <NavLink to="/login">Login Now</NavLink>
            </Typography>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
