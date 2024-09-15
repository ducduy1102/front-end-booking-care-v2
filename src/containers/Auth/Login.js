import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLogin } from "../../services/userService";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, USER_ROLE } from "../../utils";
import viFlag from "../../assets/images/vietnam-flag.svg";
import enFlag from "../../assets/images/en-flag.svg";
import { changeLanguageApp } from "../../store/actions";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const language = useSelector((state) => state.app.language);

  useEffect(() => {
    if (language) {
    }
  }, [language]);
  const dispatch = useDispatch();
  const changeLanguage = (language) => {
    props.changeLanguageAppRedux(language);
  };
  // C1
  // const userLoginSuccess = (userInfo) =>
  //   dispatch(actions.userLoginSuccess(userInfo));

  const handleUserLogin = async () => {
    setErrorMessage("");

    try {
      let data = await handleLogin(username, password);
      if (data && data.errCode !== 0) {
        setErrorMessage(data.message);
      }
      if (data && data.errCode === 0) {
        // C1
        // userLoginSuccess(data.user);

        // C2
        dispatch(actions.userLoginSuccess(data.user));
      }
    } catch (error) {
      if (error?.response?.data) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleUserLogin();
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="languages">
            <div
              className={
                language === "vi" ? "language-vi active" : "language-vi"
              }
            >
              <img
                src={viFlag}
                alt=""
                className="img-vi"
                onClick={() => changeLanguage(LANGUAGES.VI)}
              />
              <span
                className="text-vi"
                onClick={() => changeLanguage(LANGUAGES.VI)}
              >
                VN
              </span>
            </div>
            <div
              className={
                language === "en" ? "language-en active" : "language-en"
              }
            >
              <img
                src={enFlag}
                alt=""
                className="img-en"
                onClick={() => changeLanguage(LANGUAGES.EN)}
              />
              <span
                className="text-en"
                onClick={() => changeLanguage(LANGUAGES.EN)}
              >
                EN
              </span>
            </div>
          </div>
          <div className="text-login">
            <FormattedMessage id="login.login" />
          </div>
          <div className="form-group login-input">
            <label className="text-label">
              <FormattedMessage id="login.username" />
            </label>
            <input
              type="text"
              name="username"
              value={username}
              className="form-control"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group login-input">
            <label className="text-label">
              <FormattedMessage id="login.password" />
            </label>
            <div className="custom-input-password">
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                value={password}
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
              <span onClick={() => setIsShowPassword(!isShowPassword)}>
                <i
                  className={isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                ></i>
              </span>
            </div>
          </div>
          <div className="" style={{ color: "red" }}>
            {errorMessage}
          </div>
          <div className="">
            <button className="btn-login" onClick={() => handleUserLogin()}>
              <FormattedMessage id="login.login" />
            </button>
          </div>
          <div className="">
            <span className="forgot-password">
              <FormattedMessage id="login.forgot-password" />
            </span>
          </div>
          <div className="mt-3 text-center">
            <span className="text-other-login">
              <FormattedMessage id="login.or-login-with" />
            </span>
          </div>
          <div className="social-login">
            <i className="fab fa-google-plus-g google"></i>
            <i className="fab fa-facebook-f facebook"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;
