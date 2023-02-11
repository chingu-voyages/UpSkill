import "./modal.css";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import Stars from "../Stars";
import axios from "axios";
import { useSelector } from "react-redux";

const server = import.meta.env.VITE_SERVER;
const BioModal = ({ setPostReview, postReview, receiverId }) => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const clickRef = useRef(null);
  const reviewInput = useRef(null);
  const [ selectStar, setSelectStar ] = useState(0);
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
    setPostReview(false);
    setClicked(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setClicked(true);

    if (!reviewInput.current.value) {
      setClicked(false);
      return setError(true);
    } else {
      setError(false);

      const res = await axios.post(`${server}/user/review`, {
        recevierId: receiverId,
        reviewerId: user.id,
        review: reviewInput.current.value,
        starRating: selectStar + 1,
        token: auth.token,
      });
      if (res) {
        closeModal();
        window.location.reload();
      }
    }
  };
  return (
    <div className="modal-container text-primary">
      <form ref={clickRef} className="modalCard gap-6" onSubmit={handleSubmit}>
        <RxCross2
          size={20}
          className="absolute top-2 right-3 cursor-pointer hover:text-baby"
          onClick={closeModal}
        />

        <h3 className="self-center text-xl">
          Leave a review for [Tutor's Name]
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="leading-loose pl-1">
              How would you rate [Tutor's Name] out of 5?
            </label>
            <div className="flex">
              {<Stars selectStar={selectStar} setSelectStar={setSelectStar} />}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="leading-loose pl-1">
              What can you say about your interaction with [Tutor's Name]?
            </label>
            <div className="">
              <textarea
                ref={reviewInput}
                name="review"
                id="review"
                className="input-field resize-y max-h-[200px] min-h-[100px] py-1"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="self-center text-red-500">Please leave a review 🙂</p>
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
