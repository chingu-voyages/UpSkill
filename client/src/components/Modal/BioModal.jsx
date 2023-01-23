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
      <form ref={clickRef} className="modalCard" onSubmit={handleSubmit}>
        <RxCross2
          size={20}
          className="absolute top-2 right-3 cursor-pointer hover:text-baby"
          onClick={closeModal}
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default BioModal;
