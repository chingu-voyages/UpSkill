import "./navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import NavItem from "./NavItem";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/login-logout/login-logout-slice";
import avatar from "../../assets/dashboard/avatar.svg";
import NavDropDown from "./NavDropDown";
const Navbar = () => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  const user = useSelector(state => state.auth.isAuthenticated);
  const userId = useSelector(state => state.user.id);

  const handleClick = () => setClick(!click);
  if (click) {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  } else {
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "visible";
    }
  }

  return (
    <nav
      className="bg-white border-b border-baby z-10 relative mb-4"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between max-w-[1440px] h-[4rem] px-6 md:px-10 lg:px-14 text-primary">
        <Link to="/">
          <h3 className="font-bold font-title text-2xl">UpSkill</h3>
        </Link>
        <div className="menu">
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {!user && (
              <NavItem
                output={"How it works"}
                direction="/"
                setClicker={setClick}
                clicker={click}
              />
            )}
            {user ? (
              <NavItem
                output={"Messages"}
                direction={"/messages"}
                setClicker={setClick}
                clicker={click}
              />
            ) : (
              <NavItem
                output={"About"}
                direction={"/about"}
                setClicker={setClick}
                clicker={click}
              />
            )}
            {user ? (
              // <div
              //   className="flex flex-col relative"
              //   onClick={e => toggleDropDown(e)}
              // >
              //   <img src={avatar} alt="" className="w-[2rem]" />
              //   <ul
              //     className={
              //       loggedInMenuHidden
              //         ? "dropdownMenuBlock card flex flex-col items-center gap-2"
              //         : "hidden"
              //     }
              //   >
              //     <li>
              //       <NavItem
              //         output={"Profile"}
              //         direction={"/profile"}
              //         setClicker={setClick}
              //         clicker={click}
              //       />
              //     </li>
              //     <li>
              //       <NavItem
              //         output={"Dashboard"}
              //         direction={"/dashboard"}
              //         setClicker={setClick}
              //         clicker={click}
              //       />
              //     </li>
              //     <li
              //       onClick={e => {
              //         handleLogout(e);
              //       }}
              //     >
              //       <NavItem
              //         output={"Logout"}
              //         direction={"/"}
              //         setClicker={setClick}
              //         clicker={click}
              //       />
              //     </li>
              //   </ul>
              // </div>
              <NavDropDown />
            ) : (
              <NavItem
                output={"Sign in"}
                direction={"/auth"}
                setClicker={setClick}
                clicker={click}
              />
            )}
          </ul>

          <div className="nav-icon" onClick={handleClick}>
            {click ? <RxCross2 size={30} /> : <RxHamburgerMenu size={30} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
