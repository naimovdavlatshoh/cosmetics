import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-pink-100 img-bg">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <Outlet />
        </div>
    );
};

export default Layout;
