import "./modal.css";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef } from "react";

const BioModal = ({ setEditBio }) => {
  const clickRef = useRef(null);

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
    setEditBio(false);
  };
  const handleSubmit = e => {
    e.preventDefault();
    // TODO: PUT request to update Bio.
    // closeModal();
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
            <label className="leading-loose pl-1">About:</label>
            <p className="text-xs pl-1 pb-1">
              Tell the world about you, where you are from, what you do.
            </p>
            <input
              type="text"
              name="skills"
              id="skills"
              className="input-field"
            />
          </div>

          <div>
            <label className="leading-loose pl-1">Hobbies:</label>
            <p className="text-xs pl-1 pb-1">
              List your hobbies and favourite past times.
            </p>
            <input
              type="text"
              name="skills"
              id="skills"
              className="input-field"
            />
          </div>

          <div>
            <label className="leading-loose pl-1">Mission statement:</label>
            <p className="text-xs pl-1 pb-1">
              Why you are here, what do you want to achieve, learn, teach,
              people you want to meet and how you want to benefit and learn from
              the experience.
            </p>
            <input
              type="text"
              name="skills"
              id="skills"
              className="input-field"
            />
          </div>
        </div>

        <button className="btn self-center">Submit</button>
      </form>
    </div>
  );
};

export default BioModal;
