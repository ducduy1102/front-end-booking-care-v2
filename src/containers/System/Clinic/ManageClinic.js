import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

const ManageClinic = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  useEffect(() => {
    // componentDidMount equivalent
  }, []);

  return (
    <div className="container manage-clinic-container">
      <div className="title">Manage Clinic</div>
    </div>
  );
};

export default ManageClinic;
