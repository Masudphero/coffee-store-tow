import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainLayout() {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar/>
      <Outlet />
    </div>
  );
}

export default MainLayout;