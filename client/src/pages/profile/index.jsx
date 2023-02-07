import React, { useEffect, useState } from "react";
import avatar from "../../assets/dashboard/avatar.svg";
import bio from "../../assets/dashboard/bio.svg";
import stats from "../../assets/dashboard/statistics.svg";
import session from "../../assets/dashboard/sessions.svg";
import teach from "../../assets/dashboard/teaching.svg";
import learn from "../../assets/dashboard/learner.svg";
import { BsFillStarFill } from "react-icons/bs";
import BioDetails from "../../components/BioDetails";
import {
  FaBookOpen,
  FaBookReader,
  FaBrain,
  FaCalendarAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Reviews from "../../components/Reviews";
import ReviewModal from "../../components/Modal/ReviewModal";
import axios from "axios";

function Profile() {
  const [ width, setWidth ] = useState(window.innerWidth);
  const [ postReview, setPostReview ] = useState(false);
  const [ reviews, setReviews ] = useState(null);
  const {
    id,
    about,
    first_name,
    last_name,
    profilePic,
    skills,
    mission,
  } = useSelector(state => state.user);
  console.log(reviews);
  useEffect(
    () => {
      function handleResize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    [ width ]
  );

  useEffect(
    () => {
      if (postReview) {
        window.document.body.style.overflow = "hidden";
      } else if (!postReview) {
        window.document.body.style.overflow = "unset";
      }
    },
    [ postReview ]
  );

  useEffect(
    () => {
      if (id) {
        async function getReviews() {
          const results = await axios.get(
            `${import.meta.env.VITE_SERVER}user/review/${id}`
          );
          setReviews(results.data);
        }
        getReviews();
      }
    },
    [ id ]
  );

  const handleClick = e => {
    e.stopPropagation();
    setPostReview(true);
  };

  return (
    <main className=" text-primary lg:flex lg:h-max lg:items-center">
      {postReview && (
        <ReviewModal postReview={postReview} setPostReview={setPostReview} />
      )}
      <div className="lg:flex lg:h-max lg:flex-row lg:justify-between ">
        <section className="lg:ml-8 lg:w-1/3">
          <div className="flex items-center flex-col lg:h-auto lg:my-12">
            <h2 className="font-title font-bold capitalize text-primary text-3xl mb-8">
              Hi, I'm {first_name} 👋
            </h2>
            <div className="bg-baby h-32 w-32 rounded-full flex justify-center relative">
              <img
                className="rounded-full object-cover w-full"
                src={profilePic}
                alt="image of user"
              />
            </div>
            <h4 className="font-bold capitalize text-grotto-100 text-xl mt-6">
              {first_name} {last_name}
            </h4>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center text-2xl">
                <BsFillStarFill color="#facc15" />
                <BsFillStarFill color="#facc15" />
                <BsFillStarFill color="#facc15" />
                <BsFillStarFill color="#facc15" />
                <BsFillStarFill color="#facc15" />
              </div>
              <div className="font-bold text-grotto-100 mx-2 flex flex-row items-center text-3xl">
                5.0
              </div>
              <div className="font-bold text-grotto-100 mx-2 flex flex-row items-center text-xl">
                Rating
              </div>
            </div>
          </div>
          <div className="card p-4 lg:my-12 lg:h-auto mx-4 my-6 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center my-4">
              <div className="flex">
                <FaBrain size={25} className="text-grotto-100" />
                <h3 className="font-bold ml-2 text-primary text-xl">
                  Skills offered
                </h3>
              </div>
              <span className="skill-set  text-grotto-100 mt-4">{skills}</span>
            </div>
            <div className="flex flex-col items-center my-4">
              <div className="flex">
                <FaBookReader size={25} className="text-grotto-100" />
                <h3 className="font-bold ml-2 text-primary text-xl">
                  Skills wanted
                </h3>
              </div>
              <span className="skill-set  text-grotto-100 mt-4">
                Mathematics, German tuition
              </span>
            </div>
          </div>
          <div className="card p-4 lg:my-12 lg:h-auto mx-4 my-6  flex flex-col items-center m-auto justify-between lg:justify-center h-full relative">
            <div className="flex flex-col items-center my-4">
              <h3 className="font-bold ml-2 text-primary text-xl">
                Misson Statement
              </h3>
              <span className="skill-set text-grotto-100 p-4 text-justify">
                {mission}
              </span>
            </div>
          </div>
          {width >= 1024 ? (
            <a
              className="card p-6 lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full cursor-pointer"
              href="#"
              target="_blank"
            >
              <div className="flex p-2  justify-center">
                <h3 className="font-bold mr-2 text-primary text-xl">
                  Book a session with David
                </h3>
                <FaCalendarAlt
                  size={25}
                  className="text-grotto-100 hover:text-primary"
                />
              </div>
            </a>
          ) : (
            <div className="card lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full">
              <div className="flex w-full p-4 justify-center border-b-2 border-ivory-50">
                <FaBookOpen size={25} className="text-grotto-100" />
                <h3 className="font-bold ml-2 text-primary text-xl">Bio</h3>
              </div>
              <BioDetails title="About">{about}</BioDetails>
              <BioDetails title="Education" />
              <BioDetails title="Subject" />
            </div>
          )}
        </section>
        <section className="lg:mr-8 lg:w-1/2 lg:flex lg:flex-col lg:content-center  ">
          {width >= 1024 ? (
            <div className="card lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full">
              <div className="flex w-full p-4 justify-center border-b-2 border-ivory-50">
                <img src={bio} alt="" className="w-6" />
                <h3 className="font-bold ml-2 text-primary text-xl">Bio</h3>
              </div>
              <BioDetails title="About">{about}</BioDetails>
              <BioDetails title="Education" />
              <BioDetails title="Subject" />
            </div>
          ) : (
            <a
              className="card lg:my-12 p-6 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full cursor-pointer"
              href="#"
              target="_blank"
            >
              <div className="flex w-full justify-center">
                <h3 className="font-bold mr-2 text-primary text-xl">
                  Book a session with David
                </h3>
                <FaCalendarAlt
                  size={25}
                  className="text-grotto-100 hover:text-primary"
                />
              </div>
            </a>
          )}
          <div className="card lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full">
            <div className="flex mt-4">
              <img src={stats} alt="" />
              <h3 className="ml-2 text-primary font-bold">David Statistics</h3>
            </div>

            <div className="flex max-[550px]:flex-col justify-between w-full p-8 max-[490px]:px-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <img src={session} alt="" />
                  <h4 className="ml-2 text-primary font-semibold">
                    Total Sessions
                  </h4>
                </div>
                <span className="mt-4 text-grotto-100 text-xl">12</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <img src={teach} alt="" />
                  <h4 className="ml-2 text-primary font-semibold">Teaching</h4>
                </div>
                <span className="mt-4 text-grotto-100 text-xl">4</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <img src={learn} alt="" />
                  <h4 className="ml-2 text-primary font-semibold">Learning</h4>
                </div>
                <span className="mt-4 text-grotto-100 text-xl">8</span>
              </div>
            </div>
          </div>
          <div className="card px-4 lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full">
            <h3 className="mt-2 md:text-start lg:w-full lg:ml-16 lg:my-4 text-primary font-bold text-xl">
              {reviews && reviews.length}{" "}
              {reviews && reviews.length > 1 ? "Reviews" : "Review"}
            </h3>
            {reviews &&
              reviews.map(r => (
                <Reviews
                  reviewers={reviews}
                  key={r.id}
                  avatar={r.profilePic}
                  stars={r.stars}
                >
                  {r.review}
                </Reviews>
              ))}
            <div className="flex gap-4 p-4">
              <a
                href="#"
                className="bg-grotto-100 hover:bg-primary px-6 max-[399px]:px-2 py-1 text-white rounded-full  outline outline-2 border-none outline-grotto-100"
              >
                See more
              </a>
              <button
                onClick={handleClick}
                className="bg-primary hover:bg-grotto-100 px-6 max-[399px]:px-2 py-1 text-white rounded-full  outline outline-2 border-none outline-primary"
              >
                Leave a review
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
