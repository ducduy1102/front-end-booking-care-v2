import React, { useEffect, useState, Fragment, useRef } from "react";
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
import Login from "./Auth/Login";
import System from "../routes/System";
import Doctor from "../routes/Doctor";

import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./Home/HomePage";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import VerifyEmail from "./Patient/VerifyEmail";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";
import ListDoctor from "./List/Doctor/ListDoctor";
import ListSpecialty from "./List/Specialty/ListSpecialty";
import ListClinic from "./List/Clinic/ListClinic";
import { VideoProvider } from "../context/VideoContext";

const App = (props) => {
  const [bootstrapped, setBootstrapped] = useState(false);

  const scrollbarsRef = useRef(null);

  const handleScrollToTop = () => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToTop();
    }
  };

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
          {/* <ConfirmModal /> */}

          <div className="content-container">
            <ScrollToTopButton onClick={handleScrollToTop} />
            <CustomScrollbars
              ref={scrollbarsRef}
              style={{ height: "100vh", width: "100%" }}
            >
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
                <Route
                  // path={"/doctor/"}
                  path={path.DOCTOR}
                  component={userIsAuthenticated(Doctor)}
                />

                <VideoProvider>
                  <Route path={path.HOME_PAGE} component={HomePage} />
                  <Route path={path.LIST_DOCTOR} component={ListDoctor} />
                  <Route path={path.LIST_SPECIALTY} component={ListSpecialty} />
                  <Route path={path.LIST_CLINIC} component={ListClinic} />
                </VideoProvider>

                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                <Route
                  path={path.DETAIL_SPECIALTY}
                  component={DetailSpecialty}
                />
                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                <Route
                  path={path.VERIFY_EMAIL_BOOKING}
                  component={VerifyEmail}
                />
              </Switch>
            </CustomScrollbars>
          </div>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ToastContainer />
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
