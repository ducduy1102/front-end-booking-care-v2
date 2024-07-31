import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/UserRedux";
import Header from "../containers/Header/Header";

const System = () => {
  const systemMenuPath = useSelector((state) => state.app.systemMenuPath);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      {isLoggedIn && <Header />}
      <div className="system-container">
        <div className="system-list">
          <Switch>
            <Route path="/system/user-manage" component={UserManage} />
            <Route path="/system/user-redux" component={UserRedux} />
            <Route component={() => <Redirect to={systemMenuPath} />} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default System;
