import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="max-w-6xl mx-auto  ">
      <Navbar/>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default MainLayout;