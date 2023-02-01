import "./navbar.css";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";
import NavDropDown from "./NavDropDown";
const Navbar = () => {
  const [click, setClick] = useState(false);
  const [screen, setScreen] = useState(window.innerWidth);
  const user = useSelector(state => state.auth.isAuthenticated);
  const userId = useSelector(state => state.user.id);

  useEffect(() => {
    function switchDisplay() {
      setScreen(window.innerWidth);
      if (window.innerWidth >= 771) {
        setClick(false);
      }
    }
    window.addEventListener("resize", switchDisplay);

    return () => {
      window.removeEventListener("resize", switchDisplay);
    };
  }, []);

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
          {!user ? (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <NavItem
                output={"How it works"}
                direction="/"
                setClicker={setClick}
                clicker={click}
              />
              <NavItem
                output={"About"}
                direction={"/about"}
                setClicker={setClick}
                clicker={click}
              />
              <NavItem
                output={"Sign in"}
                direction={"/auth"}
                setClicker={setClick}
                clicker={click}
              />
            </ul>
          ) : screen <= 771 ? (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <NavItem
                output={"Profile"}
                direction={"/profile"}
                setClicker={setClick}
                clicker={click}
              />
              <NavItem
                output={"Dashboard"}
                direction={"/dashboard"}
                setClicker={setClick}
                clicker={click}
              />
              <NavItem
                output={"Messages"}
                direction={"/messages"}
                setClicker={setClick}
                clicker={click}
              />
              <NavItem
                output={"Logout"}
                direction={"/logout"}
                setClicker={setClick}
                clicker={click}
              />
            </ul>
          ) : (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <NavDropDown />
            </ul>
          )}
          {/* {!user && (
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
              smallScreen ? (
                <div>
                  <NavItem
                    output={"Profile"}
                    direction={"/profile"}
                    setClicker={setClick}
                    clicker={click}
                  />
                  <NavItem
                    output={"Dashboard"}
                    direction={"/dashboard"}
                    setClicker={setClick}
                    clicker={click}
                  />
                  <NavItem
                    output={"Logout"}
                    direction={"/logout"}
                    setClicker={setClick}
                    clicker={click}
                  />
                </div>
              ) : (
                <NavDropDown />
              )
            ) : (
              <NavItem
                output={"Sign in"}
                direction={"/auth"}
                setClicker={setClick}
                clicker={click}
              />
            )} */}
          {/* </ul>
          )} */}

          <div className="nav-icon" onClick={handleClick}>
            {click ? <RxCross2 size={30} /> : <RxHamburgerMenu size={30} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
