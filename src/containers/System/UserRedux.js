import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

const UserRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  useEffect(() => {
    // componentDidMount equivalent
  }, []);

  return (
    <div className="container user-redux-container">
      <div className="title">User Manage Redux</div>
      <div className="user-redux-body">
        <button>Thêm mới người dùng</button>
      </div>
    </div>
  );
};

export default UserRedux;
