import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const linkToRedirect = isLoggedIn ? "/system/user-manage" : "/login";

  return <Redirect to={linkToRedirect} />;
};

export default Home;
