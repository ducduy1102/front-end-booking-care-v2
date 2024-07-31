import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector, useDispatch } from "react-redux";

const ManageHandbook = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Adjust according to your state structure

  useEffect(() => {
    // componentDidMount equivalent
  }, []);

  return (
    <div className="container manage-handbook-container">
      <div className="title">Manage Hanbook</div>
    </div>
  );
};

export default ManageHandbook;
