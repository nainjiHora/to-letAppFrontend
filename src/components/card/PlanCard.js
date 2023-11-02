
import React from "react";
import { Card, CardContent, CardActions, Button, Typography, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import { CheckCircle, Close } from "@mui/icons-material";

const cardStyle = {
  width: "80%", 
  margin: "16px",
  border: `2px solid ${red[500]}`,
  backgroundColor: "white",
  display: "flex",
  height:"40vh",
  flexDirection: "column",
  justifyContent: "space-between",
};

const buttonStyle = {
  backgroundColor: red[500],
  color: "white",
};

const iconStyle = {
  color: red[500],
};

const PlanCard = ({
  id,
  name,
  planValidity,
  amount,
  img,
  checkoutHandler,
  isTrialOver,
  isExpired,
}) => {
  let buttonLabel = "";

  if (name === "Trial Plan") {
    if (isTrialOver && !isExpired || isTrialOver && isExpired) {
      buttonLabel = "Plan Used";
    } else if (!isTrialOver && isExpired) {
      buttonLabel = "Plan Expired Buy New Plan";
    } else if (!isTrialOver && !isExpired) {
      buttonLabel = "Activated Plan";
    }
  } else if (name === "Premium Plan") {
    if (!isTrialOver && !isExpired) {
      buttonLabel = "Buy Now";
    } else if (isTrialOver && !isExpired) {
      buttonLabel = "Activated Plan";
    } else if (isTrialOver && isExpired) {
      buttonLabel = "Plan Expired Buy Now";
    }
  }

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Plan Duration: {planValidity} days<br />
          Cost: {amount} INR<br />
        </Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="center" width="100%">
          {isTrialOver && !isExpired ? (
            <CheckCircle sx={iconStyle} />
          ) : (
            <Close sx={iconStyle} />
          )}
        </Box>
      </CardActions>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button
          variant="contained"
          sx={buttonStyle}
          disabled={buttonLabel === "Plan Used"}
          onClick={() => checkoutHandler(amount, name, planValidity)}
        >
          {buttonLabel || "Subscribe"}
        </Button>
      </Box>
    </Card>
  );
};

export default PlanCard;
