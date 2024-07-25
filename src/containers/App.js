import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";

import Home from "../routes/Home";
// import Login from "../routes/Login";
import Login from "./Auth/Login";
import Header from "./Header/Header";
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";

const App = (props) => {
  const [bootstrapped, setBootstrapped] = useState(false);

  const handlePersistorState = () => {
    const { persistor } = props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (props.onBeforeLift) {
        Promise.resolve(props.onBeforeLift())
          .then(() => setBootstrapped(true))
          .catch(() => setBootstrapped(true));
      } else {
        setBootstrapped(true);
      }
    }
  };

  useEffect(() => {
    handlePersistorState();
  }, []);

  return (
    <Fragment>
      <Router history={history}>
        <div className="main-container">
          <ConfirmModal />
          {props.isLoggedIn && <Header />}

          <span className="content-container">
            <Switch>
              <Route path={path.HOME} exact component={Home} />
              <Route
                path={path.LOGIN}
                component={userIsNotAuthenticated(Login)}
              />
              <Route
                path={path.SYSTEM}
                component={userIsAuthenticated(System)}
              />
            </Switch>
          </span>

          <ToastContainer
            className="toast-container"
            toastClassName="toast-item"
            bodyClassName="toast-item-body"
            autoClose={false}
            hideProgressBar={true}
            pauseOnHover={false}
            pauseOnFocusLoss={true}
            closeOnClick={false}
            draggable={false}
            closeButton={<CustomToastCloseButton />}
          />
        </div>
      </Router>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
