import { AccountCircleRounded, Image } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import "../assets/css/login.scss";
import { axiosInstance } from "../Utils/jwtInterceptors";

const EditCompanyProfile = () => {
  const { action } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm();

  useEffect(() => {
    axiosInstance.get('company/')
      .then((response) => {
        if (response?.status === 200) {
          reset(response?.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  

  const formSubmit = async (data) => {
    let createFormData = new FormData();
    let updateFormData = new FormData();

    if (data) {
      Object.entries(data).map(async (item) => {
        const [key, val] = item;

        // Create company FormData (Skip empty fields)
        if (action === "add") {
          if (val) {
            createFormData.append(key, val);
          }
        }

        // Update company FormData (Retain empty fields)
        else if (action === "update") {
          updateFormData.append(key, val ? val : "");
        }
      });
    }
    /* -- */


    if (action === "add") {
      setIsLoading(true);
      // Call Create API
      axiosInstance
        .post("company/", createFormData)
        .then((response) => {
          navigate("/");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else if (action === "update") {
      setIsLoading(true);
      // Call Update API
      axiosInstance
        .patch("company/", updateFormData)
        .then((response) => {
          navigate("/");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }





  return (
    <Box className="uppercontainer">
      <Container className="container">
        <Typography variant="h3" className="heading">
          Company Profile
        </Typography>
        <Box className="formUpperContainer">
          <FormControl className="formcontainer" onSubmit={handleSubmit(formSubmit)}>
            {/* <Box className="uploadBox">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                size="large"
              >
                <input hidden accept="image/*" type="file" />
                <AccountCircleRounded fontSize="large" />
              </IconButton>
            </Box>
            <Box className="uploadBox">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                size="large"
              >
                <input hidden accept="image/*" type="file" />
                <Image fontSize="large" />
              </IconButton>
            </Box> */}
            <Box className="alignRow">
              <TextField
                {...register("company_name", {
                  required: 'Company name is required.'
                })}
                name="company_name"
                // label="Company Name"
                placeholder="Company Name"
                size="small"
                error={errors?.company_name ? true : false}
                helperText={errors?.company_name && errors?.company_name.message}
              />
              <TextField
                {...register("company_address", {
                  required: 'Company Address is required.'
                })}
                name="company_address"
                // label="Company Address"
                placeholder="Company Address"
                size="small"
                error={errors?.company_address ? true : false}
                helperText={errors?.company_address && errors?.company_address.message}
              />
            </Box>

            <Box className="alignRow">
              <TextField
                {...register("gst_number", {
                  required: 'GST number is required.'
                })}
                name="gst_number"
                // label="GST"
                placeholder="GST"
                size="small"
                error={errors?.gst_number ? true : false}
                helperText={errors?.gst_number && errors?.gst_number.message}
              />
              <TextField
                {...register("business_email", {
                  required: 'Email is required.'
                })}
                name="business_email"
                // label="Email"
                placeholder="Business Email"
                size="small"
                error={errors?.business_email ? true : false}
                helperText={errors?.business_email && errors?.business_email.message}
              />
            </Box>
            {/* <TextField
              name="address"
              label="Address"
              placeholder="Address"
              size="small"
            /> */}
            <TextField
              {...register("company_description", {
                required: 'Company Description is required.'
              })}
              name="company_description"
              // label="Company Description"
              placeholder="Company Description"
              size="small"
              multiline
              minRows={4}
              error={errors?.company_description ? true : false}
              helperText={errors?.company_description && errors?.company_description.message}
            />
            <Button variant="contained" type="submit" onClick={handleSubmit(formSubmit)}>{action === 'add' ? 'Create' : 'Update'} Profile</Button>
            <Button
              onClick={() => {
                navigate('/');
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

export default EditCompanyProfile;
