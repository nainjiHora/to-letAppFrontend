import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SyncOutlined } from "@mui/icons-material";

import { AuthContext } from "../context/auth";

import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import KeyIcon from '@mui/icons-material/Key';

const ForgotPassword = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user !== null) navigate("/");
  }, [auth.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSent("");
    try {
      const { data } = await axios.post(`/forgot-password`, { email });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        setSuccess(false);
      } else {
        setSuccess(true);
        toast.success("Check your email for the secret code");
        setLoading(false);
        setSent("Code Sent");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/reset-password`, {
        email,
        code,
        newPassword,
      });
      if (data.ok) {
        toast.success("Great! Now you can log in with your new password");
        setEmail("");
        setCode("");
        setNewPassword("");
        setLoading(false);
        navigate("/signin");
      } else {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Try Again!!");
    }
  };

  return (
    <>
       
      

      <Container  
      className="forgot-box"
      style={{ margin: "2rem auto",border:"2px solid #b30707",borderRadius: "7px",width: "50%",  padding:"10px", boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
      <h2 style={{  textAlign: "center" }}>
        Forgot Password
      </h2>
        <form
          onSubmit={success ? handleResetPassword : handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
            
          }}
        >
          <TextField
            type="email"
            style={{ marginBottom: "1rem",  }}
            value={email}
            // variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            disabled={success}
            className="input-field"
            InputProps={{
              startAdornment: <AlternateEmailIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
              
            }}
          />
          {success && (
            <>
              <TextField
                type="text"
                style={{ marginBottom: "1rem" }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter secret code"
                required
                InputProps={{
                  startAdornment: <VerifiedUserIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                  
                }}
              />
              <TextField
                type="password"
                style={{ marginBottom: "2rem" }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
                InputProps={{
                  startAdornment: <KeyIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                  
                }}
              />
              <Typography  style={{ marginBottom: "1rem" ,color:"black"}}>
                Also check Spam for email
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  color="textPrimary"
                  onClick={handleSubmit}
                  style={{ color: "red", cursor: "pointer" }}
                >
                  Not Yet Received? <u style={{ color: "blue" }}>Send Again</u>
                </Typography>
                <Typography color="textSuccess">{sent}</Typography>
              </div>
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            // color="primary"
            className="input-field"
            style={{  marginTop: "1rem", backgroundColor:"#b30707",color:"#fff" }}
            disabled={loading || !email}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </Button>
        </form>
      </Container>
      

    </>
  );
};

export default ForgotPassword;
