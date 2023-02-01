import "./modal.css";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const server = import.meta.env.VITE_SERVER;

const SkillsModal = ({ setEditSkills }) => {
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
    setEditSkills(false);
    setClicked(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setClicked(true);
    const { skills } = e.target.elements;
    if (skills.value === "" || skills.value === null) {
      console.log("error", skills);
      return setError(true);
    } else {
      setError(false);

      const res = axios.put(`${server}/user/info`, {
        //Take userId from state.
        id: "11684414-9afc-4f10-be32-28bb1652b88e",
        skills: skills.value,
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

        <label htmlFor="skills" className="self-center text-xl">
          Skills
        </label>

        <div>
          <p className="text-xs pl-1 pb-1">
            Tell us your skills. Just keywords separated with commas e.g.
            “French, cooking, mathematics, painting etc.”{" "}
          </p>
          <input
            type="text"
            name="skills"
            id="skills"
            className="input-field"
          />
        </div>
        {error && (
          <p className="self-center text-red-500">
            Skills field cannot be empty
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

export default SkillsModal;