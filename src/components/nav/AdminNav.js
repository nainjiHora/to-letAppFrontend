import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Drawer, IconButton } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Dashboard,
  AccountCircle,
  AttachMoney,
  Payment,
  Menu,
  ChevronLeft,
  ContactEmergencyOutlined,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useWindowWidth } from "@react-hook/window-size";

const tabData = [
  { label: "Home", icon: <AttachMoney />, path: "/admin/home" },

  { label: "Listings", icon: <Dashboard />, path: "/admin/listing" },
  { label: "Users", icon: <AccountCircle />, path: "/admin/users" },
  { label: "Payments", icon: <Payment />, path: "/admin/payments" },
  {
    label: "Enquiry",
    icon: <ContactEmergencyOutlined />,
    path: "/admin/enquiry",
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF0000",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

const SubscriberNav = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const onlyWidth = useWindowWidth();

  const [collapsed, setCollapsed] = useState(onlyWidth < 800);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth >= 800) {
      setCollapsed(false);
    }
  }, [onlyWidth]);

  const toggleMiniDrawer = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", position: "relative" }}>
        <Drawer
          variant="permanent"
          open={!collapsed}
          sx={{
            width: collapsed ? 73 : "100%",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: collapsed ? 73 : "100%",
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              p: 1,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={toggleMiniDrawer}
            >
              {collapsed ? <ChevronLeft /> : <Menu />}
            </IconButton>
          </Box>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={current}
            onChange={(event, newValue) => setCurrent(newValue)}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {tabData.map((tab, index) => (
              <Tab
                key={index}
                label={collapsed ? "" : tab.label}
                icon={tab.icon}
                component={RouterLink}
                to={tab.path}
                value={tab.path}
                sx={{ minWidth: collapsed ? "auto" : undefined }}
              />
            ))}
          </Tabs>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default SubscriberNav;
