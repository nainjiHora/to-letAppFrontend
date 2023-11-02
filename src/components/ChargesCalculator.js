import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

import { red } from "@mui/material/colors";
const buttonStyle = {
  backgroundColor: red[500],
  color: "#FFFFFF",
};

const ChargesCalculator = ({
  price,
  goToPreviousPage,
  handleFormSubmit,
  setChargedPrice,
  days,
}) => {
  const calculateCharges = () => {
    console.log(0.05 * price);
    const charges = Math.min(0.05 * price, 500);
    setChargedPrice(charges);
    return charges.toFixed(2);
  };

  return (
    <Container maxWidth="lg">
      <form style={{ margin: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Charges Calculation
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <p style={{ fontWeight: "bold" }}>
                Charge is calculated on the basis of 5% of listing and a minimum
                of 500.
              </p>
              <p style={{ fontWeight: "bold" }}>Maximum Charge: 500</p>
              <Typography
                variant="hg"
                align="center"
                style={{ fontWeight: "bold" }}
                gutterBottom
              >
                Validity : 30 days
              </Typography>

              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Listing Price: {price} ₹
              </Typography>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Total Amount&nbsp;:&nbsp;{calculateCharges()}&nbsp;₹
              </Typography>
              <div
                style={{ display: "flex", margin: "10px ", padding: "10px" }}
              >
                {goToPreviousPage && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={goToPreviousPage}
                  >
                    Back to Listing Information
                  </Button>
                )}

                <Button
                  type="submit"
                  onClick={handleFormSubmit}
                  variant="contained"
                  style={buttonStyle}
                >
                  {calculateCharges()} ₹ Pay and Submit
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ChargesCalculator;
