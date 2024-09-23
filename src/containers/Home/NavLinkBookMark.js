import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavLinkBookMark = ({ to, children, className }) => {
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
      {children}
    </NavLink>
  );
};

export default NavLinkBookMark;
