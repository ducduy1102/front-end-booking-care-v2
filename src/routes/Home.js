// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';

// class Home extends Component {

//     render() {
//         const { isLoggedIn } = this.props;
//         let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/login';

//         return (
//             <Redirect to={linkToRedirect} />
//         );
//     }

// }

// const mapStateToProps = state => {
//     return {
//         isLoggedIn: state.admin.isLoggedIn
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const linkToRedirect = isLoggedIn ? "/system/user-manage" : "/login";

  return <Redirect to={linkToRedirect} />;
};

export default Home;
