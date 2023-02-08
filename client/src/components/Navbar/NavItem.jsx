import "./navbar.css";
import { NavLink } from "react-router-dom";

const NavItem = ({
  output,
  direction,
  clicker,
  setClicker,
  setLoggedInMenuHidden,
}) => {
  const handleClick = () => {
    if (clicker) {
      setClicker(!clicker);
    }
    if (setLoggedInMenuHidden) {
      setLoggedInMenuHidden(false);
    }
  };

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
        // onClick={clicker ? handleClick : null}
        onClick={() => {
          handleClick();
        }}
        className="nav-links"
        to={direction}
      >
        {output}
      </NavLink>
    </li>
  );
};

export default NavItem;
