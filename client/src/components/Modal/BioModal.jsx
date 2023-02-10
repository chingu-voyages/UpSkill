import "./modal.css";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBio } from "../../api";
import { setBio } from "../../features/user/user-slice";

const BioModal = ({ setEditBio }) => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const clickRef = useRef(null);
  const [ clicked, setClicked ] = useState(false);
  const [ error, setError ] = useState(false);

  useEffect(
    () => {
      function handleClickOutside(e) {
        if (!clickRef.current.contains(e.target)) {
          closeModal();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [ clickRef ]
  );

  const closeModal = () => {
    setEditBio(false);
    setClicked(false);
  };

  const handleSubmit = async e => {
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

      const res = await updateBio(
        user.id,
        aboutData,
        hobbiesData,
        missionData,
        auth.token
      );

      if (res) {
        closeModal();
        dispatch(
          setBio({
            hobbies: hobbiesData,
            about: aboutData,
            mission: missionData,
          })
        );
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
            <label className="leading-loose pl-1">About:</label>
            <p className="text-xs pl-1 pb-1">
              Tell the world about you, where you are from, what you do.
            </p>
            <input
              type="text"
              name="about"
              id="about"
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
              name="hobbies"
              id="hobbies"
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
              name="mission"
              id="mission"
              className="input-field"
            />
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
