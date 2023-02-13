import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { clearAuthTokens } from "axios-jwt";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../Utils/jwtInterceptors";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [companyData, setCompanyData] = useState({});
  const navigate = useNavigate();

  const handleLogout = async () => {
    clearAuthTokens();
    navigate('/login')
  }

  useEffect(() => {
    axiosInstance.get('user/')
      .then((response) => {
        if (response?.status === 200) {
          setUserData(response?.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  useEffect(() => {
    axiosInstance.get('company/')
      .then((response) => {
        if (response?.status === 200) {
          setCompanyData(response?.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleCreateCompany = () => {
    navigate('/comapny-profile/add')
  }

  const handleDeleteUser = () => {
    axiosInstance.delete('user/')
    .then((response) => {
      navigate('/register')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleDeleteCompany = () => {
    axiosInstance.delete('company/')
    .then((response) => {
      navigate('/')
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return (
    <Box className="uppercontainer">
      <Container className="container" style={{ minHeight: "80vh" }}>
        <Typography variant="h3" className="heading">
          Dashboard
        </Typography>
        {/* <Box sx={{
          display: "flex",
          justifyContent: "right",
          marginBotttom: "1rem"
        }}>
          <Button onClick={handleLogout} className="" variant="contained">Log Out</Button>
        </Box> */}

        <Box sx={{
          display: "flex",
          justifyContent: "right",
          marginBotttom: "1rem"
        }}>
          {!companyData?.company_name && <Button onClick={handleCreateCompany} style={{marginRight: '5px'}} variant="contained">Create Company</Button>}
          <Button onClick={handleLogout} className="" variant="contained">Log Out</Button>
        </Box>

        <Card>
          <CardHeader
            // avatar={<Avatar aria-label="recipe">{userData?.profile_image}</Avatar>}
            action={
              <>
                <IconButton
                  LinkComponent={NavLink}
                  to="user"
                  aria-label="settings"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={handleDeleteUser}
                  aria-label="settings"
                >
                  <Delete />
                </IconButton>
              </>
            }
            title={`${userData?.first_name} ${userData?.last_name}`}
            subheader={userData?.email}
          />
          <CardContent>
            <Typography paragraph>{userData?.address}</Typography>
          </CardContent>
        </Card>

        <Box sx={{ marginBottom: "2rem" }} />

        {companyData?.company_name && (
          <>
            <Card>
              <CardHeader
                // avatar={<Avatar aria-label="recipe">C</Avatar>}
                action={
                  <>
                    <IconButton
                      LinkComponent={NavLink}
                      to="comapny-profile/update"
                      aria-label="settings"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={handleDeleteCompany}
                      aria-label="settings"
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
                title={`${companyData?.company_name} (GST - ${companyData?.gst_number})`}
                subheader={companyData?.business_email}
              />
              {/* <CardMedia
                component="img"
                height="194"
                image="https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=2000&q=60"
                alt="Paella dish"
              /> */}
              <CardContent>
                <Typography paragraph className="bold">
                  Description
                </Typography>
                <Typography paragraph>{companyData?.company_description}</Typography>
                <Typography paragraph className="bold">
                  Address
                </Typography>
                <Typography paragraph>{companyData?.company_address}</Typography>
              </CardContent>
            </Card>
          </>
        )}

      </Container>
    </Box>
  );
};

export default Dashboard;
