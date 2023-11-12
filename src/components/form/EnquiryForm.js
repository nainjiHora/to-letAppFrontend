import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';

const initialState = {
  name: "",
  email: "",
  mobile: "",
  comment: "",
};

const InquiryForm = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/enquiry/create", formData);

      console.log("Response:", response);
      if (response.data.message) {
        Swal.fire({
          icon: "success",
          title: `Congratulation!!`,
          text: "Enquiry  Submitted Successfully!",
          confirmButtonText: "cool",
        });

        setFormData(initialState);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Do you want to Try again !!",
        icon: "error",
        confirmButtonText: "Cool",
      });

      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ margin: "3px auto" }}>
      <Paper
        elevation={5}
        style={{
          padding: "16px",
          borderRadius:"18px",
          border:"3px solid #b30707",
          marginBottom:"25px"
          // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div >
          <Typography variant="h5"  className="papar-box" gutterBottom >
          <ContactPageIcon style={{marginRight:"5px", color:"#b30707"}} />Feel free to Contact Us
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4}>
              <TextField
                // label="Name"
                name="name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                InputProps={{
                  startAdornment: <PersonIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                  
                }}
                
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                // label="Email"
                name="email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                InputProps={{
                  startAdornment: <EmailIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                  
                }}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                // label="Mobile"
                name="mobile"
                variant="outlined"
                fullWidth
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Phone"
                InputProps={{
                  startAdornment: <LocalPhoneIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                  
                }}

              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                // label="Comment / Message"
                name="comment"
                variant="outlined"
                placeholder="Comment / Message"
                fullWidth
                rows={4}
                required
                value={formData.comment}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <CommentIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                  
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            
            style={{ marginTop: "10px", backgroundColor:"#b30707", padding:"8px 16px", fontSize:"16px" }}
          >
            Send <SendIcon style={{marginLeft:"5px", fontSize:"16px"}}></SendIcon>
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default InquiryForm;
