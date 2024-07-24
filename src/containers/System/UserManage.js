// import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// class UserManage extends Component {

//     state = {

//     }

//     componentDidMount() {

//     }

//     render() {
//         return (
//             <div className="text-center">Manage users</div>
//         );
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

// export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useDispatch, useSelector } from "react-redux";

const UserManage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  useEffect(() => {
    // componentDidMount equivalent
  }, []);

  return <div className="text-center">Manage users</div>;
};

export default connect()(UserManage);

// const mapStateToProps = state => {
//     return {};
// };

// const mapDispatchToProps = dispatch => {
//     return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
