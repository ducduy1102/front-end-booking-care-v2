// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import * as actions from "../../store/actions";
// import Navigator from '../../components/Navigator';
// import { adminMenu } from './menuApp';
// import './Header.scss';

// class Header extends Component {

//     render() {
//         const { processLogout } = this.props;

//         return (
//             <div className="header-container">
//                 {/* thanh navigator */}
//                 <div className="header-tabs-container">
//                     <Navigator menus={adminMenu} />
//                 </div>

//                 {/* nút logout */}
//                 <div className="btn btn-logout" onClick={processLogout}>
//                     <i className="fas fa-sign-out-alt"></i>
//                 </div>
//             </div>
//         );
//     }

// }

// const mapStateToProps = state => {
//     return {
//         isLoggedIn: state.user.isLoggedIn
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         processLogout: () => dispatch(actions.processLogout()),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import viFlag from "../../assets/images/vietnam-flag.svg";
import enFlag from "../../assets/images/en-flag.svg";
import { FormattedMessage } from "react-intl";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);
  const processLogout = () => dispatch(actions.processLogout());
  const language = useSelector((state) => state.app.language);

  console.log("check user info: ", userInfo);

  const changeLanguage = (language) => {
    //fire redux event (actions)
    dispatch(changeLanguageApp(language));
  };

  return (
    <div className="header-container">
      {/* thanh navigator */}
      <div className="header-tabs-container">
        <Navigator menus={adminMenu} />
      </div>

      <div className="languages">
        <span className="welcome">
          <FormattedMessage id="home-header.welcome" />,{" "}
          {userInfo?.firstName ? userInfo.firstName : "User"} !
        </span>
        <div
          className={language === "vi" ? "language-vi active" : "language-vi"}
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
          className={language === "en" ? "language-en active" : "language-en"}
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
        {/* nút logout */}
        <div className="btn btn-logout" onClick={processLogout} title="Log out">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
