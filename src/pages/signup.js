import React, { useState, useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link as MuiLink } from "@mui/material";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    if (auth.user !== null) navigate("/");
  }, [auth.user]);

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(`/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });

      if (data.error) {
        toast.error("Register failed." + data.error);
      } else {
        toast.success("Registered Successfully " + name.toUpperCase());

        navigate("/signin");
      }
    } catch (err) {
      toast.error("Register failed. Try again.");
    } finally {
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
        bgcolor="white"
        borderRadius="4px"
        p={4}
      >
        <Typography variant="h4" align="center" gutterBottom>
          To-Let Services
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={onFinish} style={{ width: "100%" }}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
            style={{ marginTop: "1rem" }}
          >
            Sign Up
          </Button>
        </form>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "1rem" }}
        >
          Or{" "}
          <MuiLink component="button" onClick={() => navigate("/signin")}>
            Login!
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
