// import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// class RegisterPackageGroupOrAcc extends Component {

//     constructor(props) {
//         super(props);

//     }

//     render() {
//         return (
//             <div className="text-center">
//                 register package group or account
//             </div>)
//     }

// }

// const mapStateToProps = state => {
//     return {

//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(RegisterPackageGroupOrAcc);
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect, useDispatch, useSelector } from "react-redux";

const RegisterPackageGroupOrAcc = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure
  return <div className="text-center">register package group or account</div>;
};

export default connect()(RegisterPackageGroupOrAcc);

// const mapStateToProps = state => {
//     return {};
// };

// const mapDispatchToProps = dispatch => {
//     return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(RegisterPackageGroupOrAcc);
