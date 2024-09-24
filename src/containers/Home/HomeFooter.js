import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import { FormattedMessage } from "react-intl";

const HomeFooter = ({ className = "" }) => {
  return (
    <footer className={`home-footer ${className}`}>
      <div className="container">
        <p>
          &copy; <FormattedMessage id="homepage.copyright" />
          <a
            className="click"
            href="https://www.facebook.com/ducduy1110"
            target="_blank"
            rel="noreferrer"
          >
            &#8594; <FormattedMessage id="homepage.click" /> &#8592;
          </a>
        </p>
      </div>
    </footer>
  );
};

export default HomeFooter;
