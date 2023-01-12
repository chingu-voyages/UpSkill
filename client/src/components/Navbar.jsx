import { HiBars4 } from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import { useState } from "react";

const Navbar = () => {
  const [ nav, setNav ] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="w-screen h-[80px] border-y-2">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <h1 className="text-3xl ml-4 sm:text-4xl text-primary cursor-pointer">
          UpSkill
        </h1>
        <ul className="hidden md:flex text-primary space-x-6 mx-4">
          <li>How it works</li>
          <li>About</li>
          <li>Sign In</li>
        </ul>
        <div className="md:hidden" onClick={handleClick}>
          {!nav ? (
            <HiBars4 className="w-5 cursor-pointer" />
          ) : (
            <HiOutlineX className="w-5 cursor-pointer" />
          )}
        </div>
      </div>
      <ul className={!nav ? "hidden" : "text-primary px-6 space-y-3 my-3"}>
        <li>How it works</li>
        <li>About</li>
        <li>Sign In</li>
        <li>Sign Up</li>
      </ul>
    </div>
  );
};

export default Navbar;
