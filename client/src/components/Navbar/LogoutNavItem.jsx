import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../../features/login-logout/login-logout-slice";

const LogoutNavItem = ({ output, direction, clicker, setClicker }) => {
  const dispatch = useDispatch();

  const handleClick = e => {
    e.preventDefault();
    if (clicker) {
      setClicker(!clicker);
    }
    dispatch(logOut());
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
        onClick={e => {
          handleClick(e);
        }}
        className="nav-links"
        to={direction}
      >
        {output}
      </NavLink>
    </li>
  );
};

export default LogoutNavItem;
