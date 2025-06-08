import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Toolbar,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../context/AuthContext";
import { Utils } from "../../utils/Utils";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const drawerWidth = 220;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Utils.confirmMessage(
      "Êtes-vous sûr de vouloir déconnecter ?", 
      async () => {
        logout();
        navigate("/");
      },
      () => { 
        console.log("Déconnexion annulée par l'utilisateur.");
      }
    );
  };

  return(
    <Drawer
      variant="persistent"
      open={isOpen}
      onClose={toggleSidebar}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#f5f7fa",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/dashboard">
              <ListItemIcon>
                <DashboardIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Tableau de bord" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/patients">
              <ListItemIcon>
                <PeopleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/appointments">
              <ListItemIcon>
                <EventNoteIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Rendez-vous" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/services">
              <ListItemIcon>
                <MedicalServicesIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Services médicaux" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItemButton>
        </ListItem>
      </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;