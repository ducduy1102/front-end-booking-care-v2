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

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const processLogout = () => dispatch(actions.processLogout());

  return (
    <div className="header-container">
      {/* thanh navigator */}
      <div className="header-tabs-container">
        <Navigator menus={adminMenu} />
      </div>

      {/* nút logout */}
      <div className="btn btn-logout" onClick={processLogout}>
        <i className="fas fa-sign-out-alt"></i>
      </div>
    </div>
  );
};

export default Header;
