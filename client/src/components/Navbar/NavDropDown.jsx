import "./navbar.css";
import { useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";
import avatar from "../../assets/dashboard/avatar.svg";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/login-logout/login-logout-slice";
const NavDropDown = () => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [loggedInMenuHidden, setLoggedInMenuHidden] = useState(false);
  const clickRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!clickRef.current.contains(e.target)) {
        setLoggedInMenuHidden(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  const toggleDropDown = e => {
    e.preventDefault();
    e.stopPropagation();
    setLoggedInMenuHidden(state => !state);
  };

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logOut());
  };
  return (
    <div className="flex flex-col relative" ref={clickRef}>
      <img
        src={avatar}
        alt=""
        className="w-[2rem] cursor-pointer"
        onClick={e => toggleDropDown(e)}
      />
      <ul
        className={
          loggedInMenuHidden
            ? "dropdownMenuBlock card flex flex-col items-center gap-2"
            : "hidden"
        }
      >
        <NavItem
          output={"Profile"}
          direction={"/profile"}
          setClicker={setClick}
          clicker={click}
          setLoggedInMenuHidden={setLoggedInMenuHidden}
        />
        <NavItem
          output={"Dashboard"}
          direction={"/dashboard"}
          setClicker={setClick}
          clicker={click}
          setLoggedInMenuHidden={setLoggedInMenuHidden}
        />
        <NavItem
          output={"Messages"}
          direction={"/messages"}
          setClicker={setClick}
          clicker={click}
        />

        <div
          onClick={e => {
            handleLogout(e);
          }}
        >
          <NavItem
            output={"Logout"}
            direction={"/"}
            setClicker={setClick}
            clicker={click}
            setLoggedInMenuHidden={setLoggedInMenuHidden}
          />
        </div>
      </ul>
    </div>
  );
};

export default NavDropDown;
