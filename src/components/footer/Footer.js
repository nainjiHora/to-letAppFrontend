import React from 'react';
import { Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from '@mui/icons-material'; 


const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              HELP & SUPPORT
            </Typography>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white">
                  Call now
                </Link>
              </li>
              <li>
                <Link to="/terms-service" className="text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-white">
                About us
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom>
              NAVIGATION MENU
            </Typography>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white">
                  Home
                </Link>
              </li>
              <li>{/* Add other navigation links here */}</li>
            </ul>
          </Grid>
        </Grid>
        <Typography variant="body2" style={{ marginTop: '20px' }}>
          &copy; 2023 to-let.live
        </Typography>
        <div className="mt-3">
          {/* Add Material-UI icons here */}
          <Facebook className="text-white me-3" />
          <Twitter className="text-white me-3" />
          <Instagram className="text-white" />
        </div>
      </Container>
    </footer>


  );
};

export default Footer;
