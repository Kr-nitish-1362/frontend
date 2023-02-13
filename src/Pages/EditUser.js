import { AccountCircleRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Utils/jwtInterceptors";
import "../assets/css/login.scss";

const EditUser = () => {
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('user/')
      .then((response) => {
        if (response?.status === 200) {
          reset(response?.data)
        }
      })
      .catch((error) => {
        const data = error?.response?.data;
        setError("email", { type: "focus", message: data['email'] });
      })
  }, [])


  const submitForm = async (data) => {
    let formData = new FormData();

    formData.append('first_name', data?.first_name)
    formData.append('last_name', data?.last_name)
    formData.append('email', data?.email)
    formData.append('address', data?.address)

    try {
      const { data, status } = await axiosInstance.patch("user/", formData);
      if (status === 200){
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Box className="uppercontainer">
      <Container className="container">
        <Typography variant="h3" className="heading">
          User Profile
        </Typography>
        <Box className="formUpperContainer">
          <FormControl className="formcontainer" onSubmit={handleSubmit(submitForm)}>
            {/* <Box className="uploadBox">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                size="large"
              >
                <input
                  {...register("profile_image", {
                    required: 'Image name is required.'
                  })}
                  hidden accept="image/*" type="file" />
                <AccountCircleRounded fontSize="large" />
              </IconButton>
            </Box> */}
            <Box className="alignRow">
              <TextField
                {...register("first_name", {
                  required: 'First name is required.'
                })}
                name="first_name"
                // label="First Name"
                placeholder="First Name"
                size="small"
              />
              <TextField
                {...register("last_name", {
                  required: 'Last name is required.'
                })}
                name="last_name"
                // label="Last Name"
                placeholder="Last Name"
                size="small"
              />
            </Box>
            <TextField
              {...register("email", {
                required: 'Email name is required.'
              })}
              name="email"
              // label="Email"
              placeholder="Email"
              size="small"
            />
            {/* <Box className="alignRow">
              <TextField
                name="password"
                label="Password"
                placeholder="Password"
                size="small"
              />
              <TextField
                name="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                size="small"
              />
            </Box> */}
            <TextField
              {...register("address", {
                required: 'Address is required.'
              })}
              name="address"
              // label="Address"
              placeholder="Address"
              size="small"
            />
            <Button variant="contained" onClick={handleSubmit(submitForm)}>Update Profile</Button>
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
          </FormControl>
        </Box>
      </Container>
    </Box>
  );
};

export default EditUser;
