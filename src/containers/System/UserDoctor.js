import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

const UserDoctor = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  useEffect(() => {
    // componentDidMount equivalent
  }, []);

  return (
    <div className="container user-doctor-container">
      <div className="title">User Doctor</div>
    </div>
  );
};

export default UserDoctor;
