import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface NavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => (
  <AppBar position="fixed" sx={{ bgcolor: "#1976d2", zIndex: 1201 }}>
    <Toolbar>
      <IconButton
        color="inherit"
        edge="start"
        onClick={toggleSidebar}
        sx={{ mr: 2, display: { md: "none" } }}
        aria-label="open drawer"
      >
        <MenuIcon />
      </IconButton>
      <LocalHospitalIcon sx={{ mr: 1 }} />
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: "bold" }}>
        Health Center HMS
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;