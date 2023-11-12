import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const locations = [
  { name: "Delhi", icon: <LocationOnIcon /> },
  { name: "Mumbai", icon: <LocationOnIcon /> },
  { name: "Jaipur", icon: <LocationOnIcon /> },
];

const Location = () => {
  return (
    <div>
      <Grid container >
        {locations.map((location, index) => (
          <Paper elevation={3} className="location-box" style={{   padding: "16px", margin: "10px" }}>
            <div className="d-flex justify-content-center"> {location.icon}</div>
            <Link
              to={`/ads/location/${location.name.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {/* Link to /ads/location/locationName in lowercase */}
              <Typography variant="subtitle1" className=" fw-bold d-flex justify-content-center" >{location.name}</Typography>
            </Link>
          </Paper>
        ))}
      </Grid>
    </div>
  );
};

export default Location;
