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
          borderRadius:"20px",
          border:"4px solid red"
          // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div >
          <Typography variant="h5" gutterBottom >
            <span className="text-danger">Feel free to Contact US</span>
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4}>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                label="Mobile"
                name="mobile"
                variant="outlined"
                fullWidth
                required
                value={formData.mobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Comment / Message"
                name="comment"
                variant="outlined"
                fullWidth
                rows={4}
                required
                value={formData.comment}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default InquiryForm;
