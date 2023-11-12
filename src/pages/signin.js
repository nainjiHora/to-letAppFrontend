import React, { useState, useContext, useEffect } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import LoginGoogle from "../components/auth/LoginGoogle";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


import KeyIcon from '@mui/icons-material/Key';
const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (auth.user !== null) navigate("/");
  }, [auth.user]);

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(`/signin`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Welcome " + data.user.name);

        setLoading(false);

        if (data.user?.role === "Admin") {
          window.location.href = "/admin/home";
        } else if (data.user?.role === "Subscriber") {
          window.location.href = "/subscriber/dashboard";
        } else if (data.user?.role === "Trial") {
          window.location.href = "/trial/home";
        } else {
          window.location.href = "/user/home";
        }
      }
    } catch (err) {
      toast.error("SignIn failed. Try again.");
      setLoading(false);
    }
  };

  return (
    
    <Container maxWidth="md">
      <Box
      className="singin-box"
      margin={"2rem"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        border={"2px solid #b30707"}
        borderRadius={"5px"}
        padding={"5px"}

        boxShadow={ "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}
      >
        <Typography variant="h3" className="wel-text" align="center"  gutterBottom>
          Welcome!
        </Typography>
        {/* <Typography variant="h5" className="wel-text-p"  align="center" gutterBottom>
          Sign In to continue
        </Typography> */}
        <LoginGoogle />
        <div className="mt-2" style={{color:"#b30707,"}}>OR</div>
        <form onSubmit={onFinish} style={{ width: "100%" }}>
         <div className="container d-flex justify-content-center">
         <div className="row  ">
          <div className="col-12  col-md-12 d-flex justify-content-end ">
             <TextField
            id="email"
            // label="Email"
            variant="standard"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            // fullWidth
            margin="normal"
            className="input-field"
            InputProps={{
              startAdornment: <AlternateEmailIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
              
            }}
          />
          </div>
          </div>
          </div>
          <div className="container d-flex justify-content-center">
          <div className="row ">
          <div className="col-12 d-flex justify-content-end">
          <TextField
            id="password"
            // label="Password"
            variant="standard"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            // fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <KeyIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }} />,
            }}
          />
          </div>
          </div>
          </div>
          <Button
            variant="contained"
            // color="primary"
            className="sign-in-btn"
            type="submit"
            disabled={loading}
            // fullWidth
            align="center"
            style={{margin: '1rem auto', display: "flex", padding:"7px 35px"}}
            // style={{ marginTop: "1rem" }}
          >
            Sign In
          </Button>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "1rem" }}
          >
            <Link href="/forgot-password">Forgot password</Link>
          </Typography>
          <Typography variant="body2" align="center" className="m-3">
             <span> Not a User ?</span> <Link href="/signup">Register now!</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
