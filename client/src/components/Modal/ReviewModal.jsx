import "./modal.css";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import Stars from "../Stars";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

const BioModal = ({ setPostReview }) => {
  const clickRef = useRef(null);
  const [selectStar, setSelectStar] = useState(0);
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
    setPostReview(false);
    setClicked(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setClicked(true);

    let aboutData, hobbiesData, missionData;
    const { about, hobbies, mission } = e.target.elements;

    if (about.value !== null && about.value.trim() !== "") {
      aboutData = about.value;
    }
    if (hobbies.value !== null && hobbies.value.trim() !== "") {
      hobbiesData = hobbies.value;
    }
    if (mission.value !== null && mission.value.trim() !== "") {
      missionData = mission.value;
    }

    if (!aboutData && !hobbiesData && !missionData) {
      return setError(true);
    } else {
      setError(false);

      const res = axios.put(`${server}/user/info`, {
        //To take userId from state
        id: "11684414-9afc-4f10-be32-28bb1652b88e",
      });
      if (res) {
        closeModal();
      }
    }
  };
  return (
    <div className="modal-container primary">
      <form ref={clickRef} className="modalCard gap-6" onSubmit={handleSubmit}>
        <RxCross2
          size={20}
          className="absolute top-2 right-3 cursor-pointer hover:text-baby"
          onClick={closeModal}
        />

        <h3 className="self-center text-xl">About you</h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="leading-loose pl-1">
              How would you rate Tutor Name out of 5?
            </label>
            <div className="flex">
              {<Stars selectStar={selectStar} setSelectStar={setSelectStar} />}
            </div>
          </div>
        </div>

        {error && (
          <p className="self-center text-red-500">
            At least one field must be filled
          </p>
        )}

        <button
          className={clicked ? "btn self-center bg-primary" : "btn self-center"}
        >
          {clicked ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BioModal;
