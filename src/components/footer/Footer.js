import React from 'react';
import { Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from '@mui/icons-material'; 
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShieldIcon from '@mui/icons-material/Shield';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-2 lh-5">
      <Container style={{marginTop:"10px"}}>
        <Grid container spacing={6}>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" style={{fontWeight:"600",letterSpacing:"1px"}} gutterBottom>
              HELP & SUPPORT
            </Typography>
            <ul className="list-unstyled ">
              <li className='mb-2'>
                <Link to="/" className="text-white li-item">
                 <LocalPhoneIcon></LocalPhoneIcon> Call now
                </Link>
              </li>
              <li className='mb-2'>
                <Link to="/terms-service" className="text-white li-item">
                <ListAltIcon></ListAltIcon> Terms & Conditions
                </Link>
              </li>
              <li className='mb-2'>
                <Link to="/privacy-policy" className="text-white li-item">
                  <ShieldIcon ></ShieldIcon> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-white li-item">
               <InfoIcon></InfoIcon> About us
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h5" gutterBottom style={{fontWeight:"600",letterSpacing:"1px"}} >
              NAVIGATION MENU
            </Typography>
            <ul className="list-unstyled">
              <li className='mb-3'>
                <Link to="/" className="text-white li-item ">
                  <HomeIcon></HomeIcon> Home
                </Link>
              </li>

              <li>
          <Facebook className="text-white me-3" />
          <Twitter className="text-white me-3" />
          <Instagram className="text-white" /></li>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
          &copy; 2023 to-let.live
        </Typography>
            </ul>
          </Grid>
        </Grid>
        
       
      </Container>
      
    </footer>


  );
};

export default Footer;
