import React, { Profiler } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Profile from "./Profile";

function MyProfile() {
  return (
    <div className=" pt-5">
      <Navbar />
      <Profile />
      <Footer />
    </div>
  );
}

export default MyProfile;
