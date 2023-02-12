import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin, BsGoogle } from "react-icons/bs";
import { useEffect, useRef } from "react";
const Footer = () => {
  const footerRef = useRef(null);
  useEffect(() => {
    const h = footerRef.current.offsetHeight;
  }, []);
  return (
    <footer ref={footerRef} className="bg-grotto-100 text-ivory-100 p-4">
      <div className="flex">
        <Link to="/">
          <h3 className="font-title sm:text-5xl text-xl font-bold">Upskill</h3>
        </Link>
        <div className="ml-auto flex flex-col items-end gap-6">
          <h4 className="sm:text-2xl font-semibold">Info</h4>
          <div className="flex gap-2 text-sm">
            <Link className="social-link" to="#">
              Privacy
            </Link>
            <Link className="social-link" to="#">
              Contact
            </Link>
            <Link className="social-link" to="#">
              About
            </Link>
          </div>

          <h4 className="sm:text-2xl font-semibold">Socials</h4>
          <div>
            <div className="flex gap-4 text-xl">
              <a href="#" className="">
                <BsGoogle size={40} className="social-link-btn" />
              </a>
              <a
                href="https://github.com/chingu-voyages/UpSkill"
                target="_blank"
              >
                <BsGithub size={40} className="social-link-btn" />
              </a>
              <a href="#">
                <BsLinkedin size={40} className="social-link-btn" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
