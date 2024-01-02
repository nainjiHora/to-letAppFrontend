// import React, { useContext,useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   createTheme,
//   ThemeProvider,
//   Hidden,
//   Divider
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { Menu, Dashboard, ExitToApp, Info, Phone, LoginOutlined, AppRegistrationOutlined } from '@mui/icons-material'; // Import MUI icons



// import { AuthContext } from '../../context/auth';
// // Create a red and white theme


// const Navigation = () => {

//  // Create a red and white theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#FF0000', // Hex code for red #FF0000
//     },
//     secondary: {
//       main: '#FFFFFF', // Hex code for white
//     },
//   },
// });
//   const [data] = useContext(AuthContext);
//   const [auth, setAuth] = useContext(AuthContext);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const roleBasedLink = () => {
//     if (data.user?.role === 'Admin') {
//       window.location.href = '/admin/home';
//     } else if (data.user?.role === 'Subscriber') {
//       window.location.href = '/subscriber/home';
//     } else if (data.user?.role === 'Trial') {
//       window.location.href = '/trial/home';
//     } else {
//       window.location.href = '/user/home';
//     }
//   };
//   const signOut = () => {
//     // Remove from local storage
//     localStorage.removeItem('auth');
//     // Remove from context
//     setAuth({
//       user: null,
//       token: '',
//     });
//     // Redirect to login
//     window.location.href = '/signin'; // You can also use a router for navigation
//   };
//   const list = (
//     <div>
//       <List>
//         <ListItem button component={Link} to="/about">
//           <ListItemIcon>
//             <Info />
//           </ListItemIcon>
//           <ListItemText primary="About" />
//         </ListItem>
//         <ListItem button component={Link} to="/contact">
//           <ListItemIcon>
//             <Phone />
//           </ListItemIcon>
//           <ListItemText primary="Contact" />
//         </ListItem>
//       </List>
//       <Divider />
//       <List>
//         {data.user && (
//           <>
//             <ListItem button onClick={roleBasedLink}>
//               <ListItemIcon>
//                 <Dashboard />
//               </ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItem>
//             <ListItem button onClick={signOut}>
//               <ListItemIcon>
//                 <ExitToApp />
//               </ListItemIcon>
//               <ListItemText primary="Sign Out" />
//             </ListItem>
//           </>
//         )}
//       </List>
//     </div>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar position="static" color="primary">
//         <Toolbar>
//           <IconButton
//             color="secondary"
//             edge="start"
//             onClick={toggleDrawer}
//             sx={{ display: { md: 'none' } }} // Hide the icon on larger screens
//           >
//             <Menu />
//           </IconButton>
//           <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
//             <Dashboard /> ToLet
//           </Typography>
//           <Hidden mdUp implementation="css"> {/* Hide the links on smaller screens */}
//             <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
//               {list}
//             </Drawer>
//           </Hidden>
//           <Hidden smDown implementation="css"> {/* Show the links on larger screens */}
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//               {/* <Typography variant="h6" component={Link} style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}  to="/about"  >
//                 <Info /> About
//               </Typography>
              
//               <Typography variant="h6" component={Link} style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}  to="/contact">
//                 <Phone /> Contact
//               </Typography> */}
              
//               {data.user && (
//                 <>
//                   <IconButton color="secondary" onClick={roleBasedLink} style={{ marginRight: '10px' }}>
//                     <Dashboard />
//                   </IconButton>
//                   <IconButton color="secondary" onClick={signOut}>
//                     <ExitToApp />
//                   </IconButton>
//                 </>
//               )}

// {!data.user && (
//                 <>
//                   <IconButton color="secondary" component={Link} to="/signin"  style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
//                     <LoginOutlined /> Login
//                   </IconButton>
//                   <IconButton color="secondary" component={Link} to="/signup" >
//                     <AppRegistrationOutlined /> Register
//                   </IconButton>
//                 </>
//               )}
//             </div>
//           </Hidden>
//         </Toolbar>
//       </AppBar>
//     </ThemeProvider>
//   );
// }

// export default Navigation;
import React, { useContext, useState,useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Hidden,
  Divider,

} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Menu,
  Dashboard,
  ExitToApp,
  Info,
  Phone,
  LoginOutlined,
  AppRegistrationOutlined,
  PostAdd,
  PostAddOutlined,
} from '@mui/icons-material';
import {
  
  AccountCircle,
  AttachMoney,
  Description,
  Payment,
  FormatListBulleted,
  
  ChevronLeft,
  ROcketIcon,
  RocketLaunch,
  MilitaryTech
} from "@mui/icons-material";

import { AuthContext } from '../../context/auth';

import  toast  from 'react-hot-toast';

const Navigation = () => {
  const [data] = useContext(AuthContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showDeshbourdSideBar , setDeshbourdSideBar]=useState(false)

  

  

  const toggleDrawer = () => {
    // setDrawerOpen(!drawerOpen);
    if(window.location.pathname==='/subscriber/home' ||window.location.pathname==='/subscriber/dashboard' ||window.location.pathname==='/subscriber/form' ||window.location.pathname==='/subscriber/plans' ||window.location.pathname==='/subscriber/payments'||window.location.pathname==='/subscriber/ads' ||window.location.pathname==='/subscriber/boost'  ){
      setDrawerOpen(!drawerOpen);
      setDeshbourdSideBar(true)
      console.log(showDeshbourdSideBar
      )
    }

    else if(window.location.pathname==='/'){
      setDrawerOpen(!drawerOpen);
      setDeshbourdSideBar(false)
    }
    else{
      setDrawerOpen(!drawerOpen);
      console.log(showDeshbourdSideBar)
    }

   
  };
  const sideBarHidden =()=>{
    setDrawerOpen(!drawerOpen);
  }

  const roleBasedLink = () => {
    // setDrawerOpen(!drawerOpen);
    if (data.user?.role === 'Admin') {
      window.location.href = '/admin/home';
    } else if (data.user?.role === 'Subscriber') {
      window.location.href = '/subscriber/home';
    } else if (data.user?.role === 'Trial') {
      window.location.href = '/trial/home';
    } else {
      window.location.href = '/user/home';
    }
  };

  const signOut = () => {
    // setDrawerOpen(!drawerOpen);
    
    localStorage.removeItem('auth');
    toast.success("Signout  Success");

    setAuth({
      user: null,
      token: '',
    });
    window.location.href = '/signin';
  };
  const tabData = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Dashboard", icon: <Dashboard />, path: "/subscriber/dashboard" },
    {label: "Account Detail",icon: <AccountCircle />,path: "/subscriber/home"},
  
    { label: "Listing Form", icon: <Description />, path: "/subscriber/form" },
    {label:"Boosts",icon:<RocketLaunch></RocketLaunch> ,path:"/subscriber/boost"},
    {label:"Plans",icon:<MilitaryTech></MilitaryTech> ,path:"/subscriber/plans"},
  
    { label: "Payments", icon: <Payment />, path: "/subscriber/payments" },
    { label: "Listings", icon: <FormatListBulleted />, path: "/subscriber/ads" },
  ];

  const list = (
    <div>
    {showDeshbourdSideBar ? <div>
     
      {tabData.map((tab, index) => (
      <ListItem button onClick={sideBarHidden} component={Link} to={tab.path}>
              <ListItemIcon>
              {tab.icon}
              </ListItemIcon>
              <ListItemText primary={tab.label} />
      </ListItem>
       ))}
             
    </div>:<div>
      <List>
      <ListItem button onClick={sideBarHidden}  component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={sideBarHidden}  component={Link} to="/about-us">
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText  primary="About" />
        </ListItem>
        <ListItem button onClick={sideBarHidden}   component={Link} to="/about-us">
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>

        {!data.user && (
          <>
           <ListItem button onClick={sideBarHidden} component={Link} to="/signin">
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText  primary="Login" />
              </ListItem>
              <ListItem button onClick={sideBarHidden} component={Link} to="/signup">
              <ListItemIcon>
                <AppRegistrationOutlined />
              </ListItemIcon>
              <ListItemText primary="Register" />
              </ListItem>
              <ListItem button onClick={sideBarHidden} component={Link} to="/signin">
              <ListItemIcon>
                <PostAddOutlined />
              </ListItemIcon>
              <ListItemText primary="Post Ad" />
              </ListItem>
          </>

        )}
       
      </List>
      <Divider />
      <List>
        {data.user && (
          <>
            <ListItem button onClick={sideBarHidden}  component={Link} to="/subscriber/form">
          <ListItemIcon>
            <PostAddOutlined />
          </ListItemIcon>
          <ListItemText primary="Post Ad" />
        </ListItem>
            <ListItem button  onClick={roleBasedLink}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={signOut}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </>
        )}
      </List>
    </div>}
    </div>
  ); 
  const appBarStyle = {
    backgroundColor: '#b30707',
    position: "fixed",
    top: 0,
    zIndex: 10, // Background color set to red
  };

  const menuButtonStyle = {
    [Hidden.mdUp]: {
      display: 'none', // Hide the menu button on larger screens
    },
  };

  //button hover



  return (
    <>
      <AppBar position="static"   style={appBarStyle} >
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton
              style={{color:"#fff"}}
              edge="start"
              onClick={toggleDrawer}
            >
              <Menu />
            </IconButton >
          </Hidden>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'white', flexGrow: 1,fontSize:"27px" }}
          >
            {/* <Dashboard /> */}

            <img className='nav-logo' src={"../images/logo.png"} alt="" />
             {/* ToLet */}
          </Typography>
          <Hidden smDown implementation="css">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {data.user && (
                <>
                
                  <IconButton  style={{color:"#fff"}} onClick={roleBasedLink}>
                    <Dashboard />
                  </IconButton>
                  <IconButton  style={{color:"#fff"}} onClick={signOut}>
                    <ExitToApp />
                  </IconButton>
                  
                </>
              )}

              {!data.user && (
                <>
                  <Button
                    color="secondary"
                    component={Link}
                    className='log-btn'
                    to="/signin"
                    style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}
                    startIcon={<LoginOutlined />}
                  >
                    Login
                  </Button>
                  <Button
                    color="secondary"
                    component={Link}
                    className='reg-btn'

                    style={{ color:"white" }}
                    to="/signup"
                    startIcon={<AppRegistrationOutlined />}
                  >
                    Register
                  </Button>
                  
                </>
                 
              )}
            </div>
          </Hidden>
         {!data.user? <Button variant="contained" component={Link}
                        className='ad-btn'
                     
                    to="/signin" style={{ backgroundImage:" linear-gradient(to top bottom , #FF512F, #DD2476)","margin":"10px" ,color:"#fff",borderRadius:"7px" }} startIcon={<PostAdd />} >Post Your Ad
                </Button>:
                <Button  component={Link}
                className='ad-btn'
                    to="/subscriber/form"
                    style={{ backgroundImage:" linear-gradient(to top bottom , #FF512F, #DD2476)","margin":"10px" ,color:"#fff",borderRadius:"7px" }} startIcon={<PostAdd />} >
                 <span>Post Your Ad</span>
                </Button>}
        </Toolbar>
      </AppBar>
      <Hidden mdUp implementation="css">
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          {list}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navigation;
