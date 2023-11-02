import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import CountUp from "react-countup";

const CustomCircularProgress = ({ number, name }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={80}
        thickness={6}
      />
      <Typography
        variant="h6"
        color="primary"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CountUp end={number} duration={2} />
      </Typography>
    </div>
    <Typography variant="caption" color="primary" style={{ marginTop: 8 }}>
      {name.toUpperCase()}
    </Typography>
  </div>
);

export default CustomCircularProgress;
