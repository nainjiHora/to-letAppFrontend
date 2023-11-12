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
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

const SignUp = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword]  = useState("");
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
        margin={"2rem"}
        bgcolor="white"
        // borderRadius="4px"
        border={"2px solid #b30707"}
        borderRadius={"5px"}
        // padding={"5px"}

        boxShadow={ "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}

        p={4}
      >
         <Typography variant="h3" className="wel-text" align="left"  gutterBottom>
          Hii!
        </Typography>
        <Typography variant="h5" className="wel-text-p"  align="center" gutterBottom>
          Register a new account
        </Typography> 
        <form onSubmit={onFinish} style={{ width: "100%" }}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Name"
            InputProps={{
              startAdornment: <PersonIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
              
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Email"
            InputProps={{
              startAdornment: <EmailIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
              
            }}
            
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Password"
            InputProps={{
              startAdornment: <KeyIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
              
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Confirm Password"
            InputProps={{
              startAdornment: <KeyIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
              
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // fullWidth
            disabled={loading}
            // style={{ marginTop: "1rem" }}
            className="sign-in-btn"
            style={{margin: '0rem auto', display: "flex", padding:"7px 35px"}}
          >
            Sign Up
          </Button>
        </form>
        <div style={{fontSize:"20px", fontWeight:"bold",marginTop: "1rem"}}>OR</div>
        <Typography
          variant="body2"
          align="center"
        
        >
          
          <MuiLink component="button" onClick={() => navigate("/signin")}   style={{ fontSize:"20px",marginTop:"5px" }} >
            Login!
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
