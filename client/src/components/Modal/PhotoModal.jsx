import "./modal.css";
import { MdPermMedia } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef } from "react";

const PhotoModal = ({ setEditPhoto }) => {
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
    setEditPhoto(false);
  };
  const handleSubmit = e => {
    e.preventDefault();

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
        <label
          htmlFor="photo"
          className="flex items-center justify-center gap-2"
        >
          Upload your new profile pic here
          <MdPermMedia
            size={25}
            className="cursor-pointer text-grotto-100 hover:text-baby"
          />
          <input
            type="file"
            id="photo"
            accept=".png,.jpg,.jpeg,.gif"
            className="hidden"
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default PhotoModal;
