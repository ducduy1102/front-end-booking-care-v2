import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavLinkBookMark = ({ to, children, className, title, subtitle }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
  };

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={`${isActive ? "active" : ""} ${className ? className : ""}`}
    >
      <div>
        <b>{title}</b>
      </div>
      <div className="sub-title">{subtitle}</div>
      {children}
    </NavLink>
  );
};

export default NavLinkBookMark;
