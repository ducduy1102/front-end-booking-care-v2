// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { push } from "connected-react-router";

// import * as actions from "../store/actions";
// import { KeyCodeUtils, LanguageUtils } from "../utils";

// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
// import './Login.scss';
// import { FormattedMessage } from 'react-intl';

// import adminService from '../services/adminService';

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.btnLogin = React.createRef();
//     }

//     initialState = {
//         username: '',
//         password: '',
//         loginError: ''
//     }

//     state = {
//         ...this.initialState
//     };

//     refresh = () => {
//         this.setState({
//             ...this.initialState
//         })
//     }

//     onUsernameChange = (e) => {
//         this.setState({ username: e.target.value })
//     }

//     onPasswordChange = (e) => {
//         this.setState({ password: e.target.value })
//     }

//     redirectToSystemPage = () => {
//         const { navigate } = this.props;
//         const redirectPath = '/system/user-manage';
//         navigate(`${redirectPath}`);
//     }

//     processLogin = () => {
//         const { username, password } = this.state;

//         const { adminLoginSuccess, adminLoginFail } = this.props;
//         let loginBody = {
//             username: 'admin',
//             password: '123456'
//         }
//         //sucess
//         let adminInfo = {
//             "tlid": "0",
//             "tlfullname": "Administrator",
//             "custype": "A",
//             "accessToken": "eyJhbGciOiJIU"
//         }

//         adminLoginSuccess(adminInfo);
//         this.refresh();
//         this.redirectToSystemPage();
//         try {
//             adminService.login(loginBody)
//         } catch (e) {
//             console.log('error login : ', e)
//         }

//     }

//     handlerKeyDown = (event) => {
//         const keyCode = event.which || event.keyCode;
//         if (keyCode === KeyCodeUtils.ENTER) {
//             event.preventDefault();
//             if (!this.btnLogin.current || this.btnLogin.current.disabled) return;
//             this.btnLogin.current.click();
//         }
//     };

//     componentDidMount() {
//         document.addEventListener('keydown', this.handlerKeyDown);
//     }

//     componentWillUnmount() {
//         document.removeEventListener('keydown', this.handlerKeyDown);
//         // fix Warning: Can't perform a React state update on an unmounted component
//         this.setState = (state, callback) => {
//             return;
//         };
//     }

//     render() {
//         const { username, password, loginError } = this.state;
//         const { lang } = this.props;

//         return (
//             <div className="login-wrapper">
//                 <div className="login-container">
//                     <div className="form_login">
//                         <h2 className="title">
//                             <FormattedMessage id="login.login" />
//                         </h2>
//                         <div className="form-group icon-true">
//                             <img className="icon" src={userIcon} alt="this" />
//                             <input
//                                 placeholder={LanguageUtils.getMessageByKey("login.username", lang)}
//                                 id="username"
//                                 name="username"
//                                 type="text"
//                                 className="form-control"
//                                 value={username}
//                                 onChange={this.onUsernameChange}
//                             />
//                         </div>

//                         <div id="phone-input-container" className="form-group icon-true">
//                             <img className="icon" src={passIcon} alt="this" />
//                             <input
//                                 placeholder={LanguageUtils.getMessageByKey("login.password", lang)}
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 className="form-control"
//                                 value={password}
//                                 onChange={this.onPasswordChange}
//                             />
//                         </div>

//                         {loginError !== '' && (
//                             <div className='login-error'>
//                                 <span className='login-error-message'>{loginError}</span>
//                             </div>
//                         )}

//                         <div className="form-group login">
//                             <input
//                                 ref={this.btnLogin}
//                                 id="btnLogin"
//                                 type="submit"
//                                 className="btn"
//                                 value={LanguageUtils.getMessageByKey("login.login", lang)}
//                                 onClick={this.processLogin}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         lang: state.app.language
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         navigate: (path) => dispatch(push(path)),
//         adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
//         adminLoginFail: () => dispatch(actions.adminLoginFail()),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../utils";
import userIcon from "../../src/assets/images/user.svg";
import passIcon from "../../src/assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import adminService from "../services/adminService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const btnLogin = useRef(null);
  const lang = useSelector((state) => state.app.language);
  const dispatch = useDispatch();

  const handlePersistorState = () => {
    // Implementation for handling persistor state if needed
  };

  const refresh = () => {
    setUsername("");
    setPassword("");
    setLoginError("");
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const redirectToSystemPage = () => {
    dispatch(push("/system/user-manage"));
  };

  const processLogin = () => {
    const loginBody = {
      username: "admin",
      password: "123456",
    };

    const adminInfo = {
      tlid: "0",
      tlfullname: "Administrator",
      custype: "A",
      accessToken: "eyJhbGciOiJIU",
    };

    dispatch(actions.adminLoginSuccess(adminInfo));
    refresh();
    redirectToSystemPage();

    try {
      adminService.login(loginBody);
    } catch (e) {
      console.error("Error login:", e);
    }
  };

  const handlerKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === KeyCodeUtils.ENTER) {
      event.preventDefault();
      if (btnLogin.current && !btnLogin.current.disabled) {
        btnLogin.current.click();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handlerKeyDown);
    return () => {
      document.removeEventListener("keydown", handlerKeyDown);
    };
  }, []);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="form_login">
          <h2 className="title">
            <FormattedMessage id="login.login" />
          </h2>
          <div className="form-group icon-true">
            <img className="icon" src={userIcon} alt="User Icon" />
            <input
              placeholder={LanguageUtils.getMessageByKey(
                "login.username",
                lang
              )}
              id="username"
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={onUsernameChange}
            />
          </div>

          <div id="phone-input-container" className="form-group icon-true">
            <img className="icon" src={passIcon} alt="Password Icon" />
            <input
              placeholder={LanguageUtils.getMessageByKey(
                "login.password",
                lang
              )}
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={onPasswordChange}
            />
          </div>

          {loginError !== "" && (
            <div className="login-error">
              <span className="login-error-message">{loginError}</span>
            </div>
          )}

          <div className="form-group login">
            <input
              ref={btnLogin}
              id="btnLogin"
              type="submit"
              className="btn"
              value={LanguageUtils.getMessageByKey("login.login", lang)}
              onClick={processLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
