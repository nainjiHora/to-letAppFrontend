import SubscriberLayout from "../../components/layout/SubscriberLayout";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import {
  Typography,
  CssBaseline,
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

import toast from "react-hot-toast";
const UserProfile = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsappNumber: "",
    website: "",
    location: "",
    state: "",
    zipCode: "",
    address: "",
    socialProfiles: {
      facebook: "",
      twitter: "",
      youtube: "",
      instagram: "",
      linkedin: "",
      pinterest: "",
      reddit: "",
    },
  });

  useEffect(() => {
    if (auth.user && auth.user._id) fetchUser();
  }, [auth.user, editing]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/user/${auth.user._id}`);
      setUser(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone || "",
        whatsappNumber: response.data.whatsappNumber || "",
        website: response.data.website || "",
        location: response.data.location || "",
        state: response.data.state || "",
        zipCode: response.data.zipCode || "",
        address: response.data.address || "",
        socialProfiles: response.data.socialProfiles || {
          facebook: "",
          youtube: "",
          instagram: "",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.put(`/user/update/${auth.user._id}`, formData);
      toast.success("Profile Updated Successfully");
      setEditing(false);
    } catch (error) {
      toast.error("An error occurred, Try again !!");

      console.error(error);
    }
  };

  return (
    <SubscriberLayout>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ margin: "20px auto", padding: "20px" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <form onSubmit={handleSubmit}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ marginBottom: "20px" }}
              >
                User Profile
              </Typography>

              <div style={{ lineHeight: "22px" }}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={formData.email}
                  disabled
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Whatsapp Number"
                  variant="outlined"
                  fullWidth
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappNumber: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Website"
                  variant="outlined"
                  fullWidth
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  select
                  label="State"
                  variant="outlined"
                  fullWidth
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                >
                  <MenuItem value="">--Select state--</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Jaipur">Jaipur</MenuItem>
                  <MenuItem value="Mumbai">Mumbai</MenuItem>
                  {/* Add more options as needed */}
                </TextField>

                <TextField
                  label="Zip Code"
                  variant="outlined"
                  fullWidth
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Facebook"
                  variant="outlined"
                  fullWidth
                  value={formData.socialProfiles.facebook}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialProfiles: {
                        ...formData.socialProfiles,
                        facebook: e.target.value,
                      },
                    })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Youtube"
                  variant="outlined"
                  fullWidth
                  value={formData.socialProfiles.youtube}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialProfiles: {
                        ...formData.socialProfiles,
                        youtube: e.target.value,
                      },
                    })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />

                <TextField
                  label="Instagram"
                  variant="outlined"
                  fullWidth
                  value={formData.socialProfiles.instagram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialProfiles: {
                        ...formData.socialProfiles,
                        instagram: e.target.value,
                      },
                    })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                {editing ? (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ backgroundColor: "red", color: "white" }}
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={handleEdit}
                  >
                    Update Profile
                  </Button>
                )}
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </SubscriberLayout>
  );
};

export default UserProfile;
