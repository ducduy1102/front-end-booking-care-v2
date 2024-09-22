import React from "react";
import "./ScrollToTopButton.scss";

const ScrollToTopButton = ({ onClick }) => {
  return (
    <button className="btn-to-top" onClick={onClick}>
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollToTopButton;
