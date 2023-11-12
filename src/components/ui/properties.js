import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import StoreIcon from "@mui/icons-material/Store";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

const propertyTypes = [
  { type: "Flat", icon: <ApartmentIcon /> },
  { type: "House", icon: <HomeIcon /> },
  { type: "PG", icon: <HotelIcon /> },
  { type: "Room", icon: <HotelIcon /> },
  { type: "Shop", icon: <StoreIcon /> },
  { type: "Others", icon: <MoreHorizIcon /> },
];

const Properties = () => {
  return (
    <Grid container spacing={2}  className="properties-box">
      {propertyTypes.map((property, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <Paper elevation={3} className="box-hover" style={{ textAlign: "center" }}>
            {property.icon}
            <Link
              to={`/ads/category/${property.type.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="subtitle1">{property.type}</Typography>
            </Link>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Properties;
