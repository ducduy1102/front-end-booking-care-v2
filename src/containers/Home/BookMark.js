import React from "react";
import "./BookMark.scss";
import { Link } from "react-router-dom";

const BookMark = ({ name }) => {
  return (
    <div className="container mt-3">
      <div className="bookmark-content">
        <div className="icon-bookmark">
          <Link to="/home">
            <i className="fas fa-home"></i> /
          </Link>
        </div>
        <div className="bookmark-name">{name}</div>
      </div>
    </div>
  );
};

export default BookMark;
