import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

const ManageSpecialty = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  useEffect(() => {
    // componentDidMount equivalent
  }, []);

  return (
    <div className="container manage-specialty-container">
      <div className="title">Manage Specialty</div>
    </div>
  );
};

export default ManageSpecialty;
