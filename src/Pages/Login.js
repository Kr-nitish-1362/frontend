import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { setAuthTokens } from "axios-jwt";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/login.scss";
import { axiosInstance } from "../Utils/jwtInterceptors";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    let formData = new FormData();

    formData.append('email', data?.email)
    formData.append('password', data?.password)

    try {
      const { data, status } = await axiosInstance.post("login/", formData);
      if (status === 200){
        // save tokens to storage
        setAuthTokens({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });
      }
      
      if (data) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      const { data } = err.response;
    }
  }

  return (
    <Box className="uppercontainer">
      <Container className="container">
        <Typography variant="h3" className="heading">
          Login
        </Typography>
        <Box className="formUpperContainer">
          <FormControl className="formcontainer" onSubmit={handleSubmit(handleLogin)}>
            <TextField
              {...register("email", {
                required: 'Email name is required.'
              })}
              type="email"
              name="email"
              label="Email"
              placeholder="Last Name"
              size="small"
              error={errors?.email ? true : false}
              helperText={errors?.email && errors?.email.message}
            />

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
            <Button variant="contained" onClick={handleSubmit(handleLogin)}>Login</Button>
            <Typography className="smallText">
              Don't have an account?{" "}
              <NavLink to="/register">Register Now</NavLink>
            </Typography>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
