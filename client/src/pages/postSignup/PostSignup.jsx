import React from "react";
import pic from "../../assets/signup/questions_nobg.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notPostSignUp } from "../../features/signup/signup-slice";
import { ifAuthenticated } from "../../features/login-logout/login-logout-slice";
import axios from "axios";
import { getUser } from "../../features/user/user-slice";
import { useEffect } from "react";

const PostSignup = () => {
  const { id } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const options = ["Online only", "Online & In-person", "In-person only"];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ifAuthenticated());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      wantToTeach,
      wantToLearn,
      connectingFrom,
      occupation,
      selector,
    } = e.target.elements;

    const postData = {
      teaching: wantToTeach.value ? wantToTeach.value : null,
      learning: wantToLearn.value ? wantToLearn.value : null,
      location: connectingFrom.value,
      job: occupation.value,
      method: selector.value,
    };

    dispatch(notPostSignUp());
    const sendProfileUpdate = async (userid) => {
      try {
        if (userid) {
          const res = await axios.put(
            `${import.meta.env.VITE_SERVER}/user/info/`,
            {
              id: userid,
              skills: postData.teaching,
              learning: postData.learning,
              occupation: postData.job,
              location: postData.location,
              token,
            }
          );
          return res.data;
        }
        return null;
      } catch (e) {
        return null;
      }
    };
    const res = await sendProfileUpdate(id);
    if (res) {
      dispatch(getUser(id));
      navigate("/dashboard");
    }
  };

  return (
    <main className="flex justify-center pt-8 min-h-full text-primary">
      <div className="shadow-cardSh bg-winkle min-w-[80%] p-4 py-12 flex m-12 max-w-[1200px] justify-center rounded-xl">
        <div className="hidden md:flex basis-1/2 items-center ">
          {" "}
          <img src={pic} alt="" />
        </div>
        <form
          className="flex flex-col items-center w-[80%] md:items-start gap-4 md:basis-1/2 justify-center p-2"
          onSubmit={handleSubmit}
        >
          <h1 className="max-[829px]:text-center text-2xl text-primary">
            Just Some Quick Questions
          </h1>
          <label htmlFor="wantToTeach" className="label-section -mb-4">
            <h3 className="text-sm">What skills do you want to share?</h3>
            <p className="text-note leading-loose pl-1">
              Just keywords separated with commas e.g. “French, cooking,
              mathematics”{" "}
            </p>
          </label>
          <input
            type="text"
            id="wantToTeach"
            name="wantToTeach"
            className="input-field"
          />

          <label htmlFor="wantToLearn" className="label-section -mb-4">
            <h3 className="text-sm">What skills do you want to learn?</h3>
            <p className="text-note leading-loose pl-1">
              Just keywords separated with commas e.g. “French, cooking,
              mathematics”{" "}
            </p>
          </label>
          <input
            type="text"
            id="wantToLearn"
            name="wantToLearn"
            className="input-field"
          />

          <label htmlFor="connectingFrom">
            <h3 className="text-sm text-center -mb-3">
              Where are you connecting from?
            </h3>
          </label>
          <input
            type="text"
            id="connectingFrom"
            name="connectingFrom"
            className="input-field"
            required
          />

          <label htmlFor="occupation">
            <h3 className="text-sm text-center -mb-3">
              What is your occupation?
            </h3>
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            className="input-field"
            required
          />

          <label htmlFor="selector">
            <h3 className="text-sm text-center -mb-3">
              How are you looking to connect?
            </h3>
          </label>
          <select name="selector" id="selector" className="input-field">
            {options.map((option, i) => (
              <option key={i} value={option} label={option} />
            ))}
          </select>

          <span className="text-center text-sm">
            Rather fill this out later? Click{" "}
            <span className="font-bold">
              <Link to="/">here</Link>
            </span>
          </span>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default PostSignup;
