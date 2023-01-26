import "./modal.css";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

const PhotoModal = ({ setCalendar }) => {
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
    const { photo } = e.target.elements;

    if (!photo.files[0]) {
      return setError(true);
    } else {
      setError(false);
      setClicked(true);
      // formData.append("id", userId);
      // ("id", "11684414-9afc-4f10-be32-28bb1652b88e");

      const res = await axios({
        method: "put",
        url: `${server}/user/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res) {
        closeModal();
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
        <label
          htmlFor="photo"
          className="flex items-center justify-center gap-2"
        >
          Upload your Calendly link here
        </label>
        <div>
          <p className="text-xs pl-1 pb-1">
            Don't have a calendly yet? Get one{" "}
            <a href="https://calendly.com/signup" target="_blank">
              <strong className="text-bold">here</strong>
            </a>
          </p>
          <input
            type="text"
            name="skills"
            id="skills"
            className="input-field"
          />
        </div>

        {error && <p className="self-center text-red-500">No photo attached</p>}

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
