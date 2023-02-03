import "./modal.css";
import { MdPermMedia } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const server = import.meta.env.VITE_SERVER;

const PhotoModal = ({ setEditPhoto }) => {
  const user = useSelector(state => state.user);

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
    setEditPhoto(false);
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
      const formData = new FormData();
      formData.append("profilePic", photo.files[0]);
      formData.append("id", `${user.id}`);
      const res = await axios({
        method: "put",
        url: `${server}user/photo`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res) {
        window.location.reload();
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
          Upload your new profile pic here
          <MdPermMedia
            size={25}
            className="cursor-pointer text-grotto-100 hover:text-baby"
          />
          <input
            type="file"
            id="photo"
            name="photo"
            accept=".png,.jpg,.jpeg,.gif"
            className="hidden"
          />
        </label>

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
