import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faFacebookSquare,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-grotto text-ivory p-4">
      <div className="flex">
        <Link to="/">
          <h3 className="font-title sm:text-5xl text-xl font-bold">Upskill</h3>
        </Link>
        <div className="ml-auto flex flex-col items-end gap-6">
          <h4 className="sm:text-2xl font-semibold">Info</h4>
          <div className="flex gap-2 text-sm">
            <Link className="hover:text-baby duration-75" to="#">
              Privacy
            </Link>
            <Link className="hover:text-baby duration-75" to="#">
              Contact
            </Link>
            <Link className="hover:text-baby duration-75" to="#">
              About
            </Link>
          </div>

          <h4 className="sm:text-2xl font-semibold">Socials</h4>
          <div>
            <div className="flex gap-4 text-xl">
              <a href="#" className="">
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  border
                  className="hover:text-baby hover:border-baby duration-75"
                />
              </a>
              <a href="https://github.com/chingu-voyages/UpSkill">
                <FontAwesomeIcon
                  icon={faGithub}
                  border
                  className="hover:text-baby hover:border-baby duration-75"
                />
              </a>
              <a href="#">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  border
                  className="hover:text-baby hover:border-baby duration-75"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
