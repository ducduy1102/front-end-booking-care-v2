import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

const ManageSchedule = () => {
  const systemMenuPath = useSelector((state) => state.app.systemMenuPath);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <div className="container">Manage Schedule</div>
    </>
  );
};

export default ManageSchedule;
