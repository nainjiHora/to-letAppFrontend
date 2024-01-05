import SubscriberLayout from "../../components/layout/SubscriberLayout";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import PinDropIcon from '@mui/icons-material/PinDrop';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
import { bold } from "fontawesome";
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
    if (auth.user && auth.user._id) {console.log("SSS");fetchUser();}
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
      <Container maxWidth="lg" sx={{ margin: "0px auto", padding: "20px"}}>
        <Grid container justifyContent="center" className="user-profile-card">
          <Grid item xs={12} md={8} lg={6}>
            <form onSubmit={handleSubmit} >
              <Typography
                variant="h4"
                gutterBottom
                className="user-profile"
                sx={{ marginBottom: "20px" }}
                fontWeight={bold}
                
             
              >
               <span><AccountBoxIcon fontSize="large" style={{color:"#b30707"}}/></span>
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
                  InputProps={{
                    startAdornment: <PersonIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={formData.email}
                  disabled
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    startAdornment: <EmailIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={formData.phone}
                  placeholder="Phone"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    startAdornment: <PhoneIphoneIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  label="Whatsapp Number"
                  placeholder="Whatsapp Number"
                  variant="outlined"
                  fullWidth
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappNumber: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    startAdornment: <WhatsAppIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  label="Website"
                  placeholder="Website"
                  variant="outlined"
                  fullWidth
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    startAdornment: <LanguageIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  label="Location"
                  placeholder="Location"
                  variant="outlined"
                  fullWidth
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    startAdornment: <LocationOnIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  select
                  label="State"
                  placeholder="State"
                  variant="outlined"
                  fullWidth
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    startAdornment: <PinDropIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                >
                  <MenuItem value="" selected>--Select State--</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Jaipur">Jaipur</MenuItem>
                  <MenuItem value="Mumbai">Mumbai</MenuItem>
                  {/* Add more options as needed */}
                </TextField>

                <TextField
                  label="Zip Code"
                  placeholder="Zip Code"
                  variant="outlined"
                  fullWidth
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData({ ...formData, zipCode: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    startAdornment: <EditLocationAltIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  label="Address"
                  placeholder="Home"
                  variant="outlined"
                  fullWidth
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  disabled={!editing}
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    startAdornment: <HomeIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  label="Facebook"
                  placeholder="Facebook"
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
                  InputProps={{
                    startAdornment: <FacebookIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  label="Youtube"
                  variant="outlined"
                  placeholder="Youtube"
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
                  InputProps={{
                    startAdornment: <YouTubeIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
                />

                <TextField
                  label="Instagram"
                  placeholder="Instagram"
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
                  InputProps={{
                    startAdornment: <InstagramIcon style={{color:"#b30707"}} sx={{ marginRight: 1 }}  />,
                    
                  }}
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
                      className="save-profile-btn"
                      color="secondary"
                      style={{ backgroundColor: "#b30707", color: "white" }}
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      className="cancel-profilt-btn"
                      color="primary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                  className="update-profile"
                    variant="contained"
                    style={{ backgroundColor: "#b30707", color: "white" }}
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
