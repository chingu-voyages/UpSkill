import { useEffect, useState } from "react";
import noUserImg from "../../assets/dashboard/noUser.png";
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

import { useSelector } from "react-redux";

import Reviews from "../../components/Reviews";
import ReviewModal from "../../components/Modal/ReviewModal";
import axios from "axios";
function ViewUser({ id }) {
  const viewerLoggedIn = useSelector(state => state.user.id);
  const [width, setWidth] = useState(window.innerWidth);
  const [postReview, setPostReview] = useState(false);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState(null);

  // Fetch the user's profile infomation
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/user/id/${id}`
        );
        setUser(res.data);
      };
      fetchUser();
    }
  }, [id]);
  // fetch the reviews for the user's profile
  useEffect(() => {
    const fetchReviews = async () => {
      if (id) {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/user/review/${id}`
        );
        setReviews(res.data);
      }
    };
    fetchReviews();
  }, [id]);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  useEffect(() => {
    if (postReview) {
      window.document.body.style.overflow = "hidden";
    } else if (!postReview) {
      window.document.body.style.overflow = "unset";
    }
  }, [postReview]);

  const handleClick = (e) => {
    e.stopPropagation();
    setPostReview(true);
  };

  return (
    <main className="text-primary">
      {postReview && (
        <ReviewModal
          postReview={postReview}
          setPostReview={setPostReview}
          receiverId={id}
        />
      )}
      <div className="lg:flex lg:h-max lg:flex-row lg:justify-between ">
        <section className="lg:ml-8 lg:w-1/3">
          <div className="flex items-center flex-col lg:h-auto lg:my-12">
            <h2 className="font-title font-bold text-primary text-3xl mb-8">
              Hi, I'm {user ? user?.first_name : ""} 👋
            </h2>
            <div>
              <img
                src={user?.profilePic || noUserImg}
                alt=""
                className=" border-2 border-baby object-cover h-32 w-32 rounded-full flex"
              />
            </div>
            <h4 className="font-bold text-grotto-100 text-xl mt-6">
              {user ? `${user?.first_name} ${user?.last_name}` : ""}
            </h4>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center text-2xl">
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
              <span className="skill-set  text-grotto-100 mt-4">
                {user?.skills || ""}
              </span>
            </div>
            <div className="flex flex-col items-center my-4">
              <div className="flex">
                <FaBookReader size={25} className="text-grotto-100" />
                <h3 className="font-bold ml-2 text-primary text-xl">
                  Skills wanted
                </h3>
              </div>
              <span className="skill-set  text-grotto-100 mt-4">
                {user?.learning || ""}
              </span>
            </div>
          </div>
          <div className="card p-4 lg:my-12 lg:h-auto mx-4 my-6  flex flex-col items-center m-auto justify-between lg:justify-center h-full relative">
            <div className="flex flex-col items-center my-4">
              <h3 className="font-bold ml-2 text-primary text-xl">
                Misson Statement
              </h3>
              <span className="skill-set text-grotto-100 p-4 text-justify">
                {user?.mission || ""}
              </span>
            </div>
          </div>
          {width >= 1024 ? (
            <a
              className="card p-6 lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full cursor-pointer"
              href={viewerLoggedIn && user ? user?.calendly_link : "#"}
              target={user?.calendly_link && viewerLoggedIn ? "_blank" : ""}
            >
              <div className="flex p-2  justify-center">
                <h3 className="font-bold mr-2 text-primary text-xl">
                  Book a session with {user?.first_name || ""}
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
              <BioDetails title="About">{user?.about || ""}</BioDetails>
              <BioDetails title="Education"></BioDetails>
              <BioDetails title="Occupation">
                {user?.occupation || ""}
              </BioDetails>
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
              <BioDetails title="About">{user?.about || ""}</BioDetails>
              <BioDetails title="Education"></BioDetails>
              <BioDetails title="Occupation">
                {user?.occupation || ""}
              </BioDetails>
            </div>
          ) : (
            <a
              className="card lg:my-12 p-6 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full cursor-pointer"
              href={viewerLoggedIn && user ? user?.calendly_link : "#"}
              target={user?.calendly_link && viewerLoggedIn ? "_blank" : ""}
            >
              <div className="flex w-full justify-center">
                <h3 className="font-bold mr-2 text-primary text-xl">
                  Book a session with {user?.first_name || ""}
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
              <h3 className="ml-2 text-primary font-bold w-full">
                {user ? `${user?.first_name}'s` : "User's"} Statistics
              </h3>
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
            <h3 className="mt-2 lg:my-4 text-primary font-bold text-xl">
              {reviews?.length === 1
                ? `${reviews?.length} Review`
                : `${reviews?.length} Reviews`}
            </h3>
            {reviews &&
              [...Array(3)].map((elem, i) => (
                <Reviews
                  key={`${reviews[i]?.id}${i}`}
                  stars={reviews[i]?.stars}
                  id={reviews[i]?.reviewerId}
                >
                  {reviews[i]?.review}
                </Reviews>
              ))}
            <div className="flex gap-4 p-4">
              {reviews?.length > 3 ? (
                <a
                  href="#"
                  className="bg-grotto-100 hover:bg-primary px-6 max-[399px]:px-2 py-1 text-white rounded-full  border-2 border-grotto-100"
                >
                  See more
                </a>
              ) : null}
              {viewerLoggedIn && (
                <button
                  onClick={handleClick}
                  className="bg-primary hover:bg-grotto-100 px-6 max-[399px]:px-2 py-1 text-white rounded-full  border-2 border-primary"
                >
                  Leave a review
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ViewUser;
