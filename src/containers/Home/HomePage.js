import React from "react";
import { useSelector } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";

const HomePage = () => {
  return (
    <div>
      <HomeHeader />
      <Specialty />
    </div>
  );
};

export default HomePage;
