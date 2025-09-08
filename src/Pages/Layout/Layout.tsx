import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Foot/Foot";
import { Outlet } from "react-router-dom";



export default function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
}
