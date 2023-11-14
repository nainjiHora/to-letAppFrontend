import SubscriberLayout from "../../components/layout/SubscriberLayout";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CssBaseline,
  Container,
  Grid,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Profile = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const [users, setUsers] = useState({});

  useEffect(() => {
    if (auth.user && auth.user._id) fetchUser();
  }, [auth.user]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/user/${auth.user._id}`);

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SubscriberLayout>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Card
              sx={{
                width: "100%",
                boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                margin: "50px auto",
                // marginTop: "50px",
                border:"1px solid #b30707"
              }}
              md={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  color="black"
                  sx={{ marginBottom: "20px" }}
                >
                  User Profile
                </Typography>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: "#b30707",
                    marginBottom: "20px",
                  }}
                >
                  <AccountCircle fontSize="large" style={{backgroundColor:"#b30707"}} />
                </Avatar>
                <Typography
                  color="textPrimary"
                  variant="body1"
                  align="center"
                  sx={{ marginBottom: "10px" }}
                >
                  <strong>Name:</strong> {users.name}
                  <br />
                  <strong>Email:&nbsp;</strong> {users.email}
                  <br />
                  <strong>Trial Status:</strong>{" "}
                  <span style={{ color: users.istrialOver ? "red" : "green" }}>
                    {users.istrialOver ? "Expired" : "Active"}
                  </span>
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </SubscriberLayout>
  );
};

export default Profile;
