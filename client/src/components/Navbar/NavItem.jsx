import "./navbar.css";
import { NavLink } from "react-router-dom";

const NavItem = ({ output, direction, clicker, setClicker }) => {
  const handleClick = () => setClicker(!clicker);
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
