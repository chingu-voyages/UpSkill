import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const NavItem = ({ output, direction, clicker, setclicker }) => {
  const handleClick = () => setClick(!clicker);
  if (clicker) {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  } else {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "visible";
    }
  }

  return (
    <li className="nav-item">
      <NavLink
        onClick={clicker ? handleClick : null}
        className="nav-links"
        to={direction}
      >
        {output}
      </NavLink>
    </li>
  );
};

export default NavItem;
