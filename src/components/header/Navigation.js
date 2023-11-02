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
import React, { useContext, useState } from 'react';
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

import { AuthContext } from '../../context/auth';
import  toast  from 'react-hot-toast';

const Navigation = () => {
  const [data] = useContext(AuthContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const roleBasedLink = () => {
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
    localStorage.removeItem('auth');
    toast.success("Signout  Success");

    setAuth({
      user: null,
      token: '',
    });
    window.location.href = '/signin';
  };

  const list = (
    <div>
      <List>
        <ListItem button component={Link} to="/about">
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/contact">
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>

        {!data.user && (
          <>
           <ListItem button component={Link} to="/signin">
 <ListItemIcon>
   <LoginOutlined />
 </ListItemIcon>
 <ListItemText primary="Login" />
</ListItem>
<ListItem button component={Link} to="/signup">
 <ListItemIcon>
   <AppRegistrationOutlined />
 </ListItemIcon>
 <ListItemText primary="Register" />
</ListItem>
<ListItem button component={Link} to="/signin">
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
            <ListItem button component={Link} to="/subscriber/form">
          <ListItemIcon>
            <PostAddOutlined />
          </ListItemIcon>
          <ListItemText primary="Post Ad" />
        </ListItem>
            <ListItem button onClick={roleBasedLink}>
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
    </div>
  );
  const appBarStyle = {
    backgroundColor: 'red', // Background color set to red
  };

  const menuButtonStyle = {
    [Hidden.mdUp]: {
      display: 'none', // Hide the menu button on larger screens
    },
  };


  return (
    <>
      <AppBar position="static" color="primary"  style={appBarStyle} >
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton
              color="secondary"
              edge="start"
              onClick={toggleDrawer}
            >
              <Menu />
            </IconButton>
          </Hidden>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}
          >
            <Dashboard /> ToLet
          </Typography>
          <Hidden smDown implementation="css">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {data.user && (
                <>
                
                  <IconButton color="secondary" onClick={roleBasedLink}>
                    <Dashboard />
                  </IconButton>
                  <IconButton color="secondary" onClick={signOut}>
                    <ExitToApp />
                  </IconButton>
                   <Button variant="contained" component={Link}
                    to="/subscriber/form" style={{ backgroundColor: "#7F00FF","padding":"10px","margin":"10px" }} startIcon={<PostAdd />} >
                  Post Your Ad
                </Button>
                </>
              )}

              {!data.user && (
                <>
                  <Button
                    color="secondary"
                    component={Link}
                    to="/signin"
                    style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}
                    startIcon={<LoginOutlined />}
                  >
                    Login
                  </Button>
                  <Button
                    color="secondary"
                    component={Link}
                    to="/signup"
                    startIcon={<AppRegistrationOutlined />}
                  >
                    Register
                  </Button>
                  <Button variant="contained" component={Link}
                    to="/signin" style={{ backgroundColor: "#7F00FF","padding":"10px","margin":"10px" }} startIcon={<PostAdd />} >
                  Post Your Ad
                </Button>
                </>
                 
              )}
            </div>
          </Hidden>
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
