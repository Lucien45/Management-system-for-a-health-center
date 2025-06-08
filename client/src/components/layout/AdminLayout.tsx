import React from 'react'
import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* Navbar */}
            <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default AdminLayout