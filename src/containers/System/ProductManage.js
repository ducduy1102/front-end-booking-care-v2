// import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// class ProductManage extends Component {

//     state = {

//     }

//     componentDidMount() {
//     }

//     render() {
//         return (
//             <div className="text-center" >Manage products</div>
//         )
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

// export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);

import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

const ProductManage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  useEffect(() => {
    // componentDidMount equivalent
  }, []);

  return <div className="text-center">Manage products</div>;
};

export default connect()(ProductManage);
