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
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" align="center" gutterBottom>
          To-Let Services
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        <LoginGoogle />
        <form onSubmit={onFinish} style={{ width: "100%" }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <EmailIcon sx={{ marginRight: 1 }} />,
            }}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <LockIcon sx={{ marginRight: 1 }} />,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            fullWidth
            style={{ marginTop: "1rem" }}
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
          <Typography variant="body2" align="center">
            Or <Link href="/signup">Register now!</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
