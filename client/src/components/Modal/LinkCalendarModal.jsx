import "./modal.css";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

const server = import.meta.env.VITE_SERVER;

const PhotoModal = ({ setCalendar }) => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);

  const clickRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!clickRef.current.contains(e.target)) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clickRef]);

  const closeModal = () => {
    setCalendar(false);
    setClicked(false);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    //userId needed from state after auth
    const { calendly } = e.target.elements;
    if (!calendly.value) {
      return setError(true);
    } else {
      if (calendly.value.match(/calendly.com\/\w*\/\w*/gm)) {
        setError(false);
        setClicked(true);
        const res = await axios.put(`${server}/user/calendar`, {
          id: user.id,
          calendly: calendly.value,
          token: auth.token,
        });
        if (res) {
          closeModal();
        }
      } else {
        return setError(true);
      }
    }
  };
  return (
    <div className="modal-container primary">
      <form
        ref={clickRef}
        className="modalCard gap-6 items-center"
        onSubmit={handleSubmit}
      >
        <RxCross2
          size={20}
          className="absolute top-2 right-3 cursor-pointer hover:text-baby"
          onClick={closeModal}
        />
        <h3 className="font-semibold">Upload your Calendly link here</h3>
        <div>
          <p className="pl-1 pb-1">
            Don't have a calendly yet?
            <a href="https://calendly.com/signup" target="_blank">
              {" "}
              To open a calendly please click
              <strong className="text-bold"> here</strong>
            </a>
          </p>
          <input
            type="text"
            name="calendly"
            id="calendly"
            className="input-field w-full"
          />
        </div>

        {error && (
          <p className="self-center text-red-500">
            Please enter a valid Calendly link
          </p>
        )}

        <button
          disabled={clicked}
          className={clicked ? " btn bg-primary" : "btn"}
        >
          {clicked ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PhotoModal;
