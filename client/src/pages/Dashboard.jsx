import noUserImg from "../assets/dashboard/noUser.png";
import placeholder from "../assets/dashboard/placeholder.svg";
import stats from "../assets/dashboard/statistics.svg";
import session from "../assets/dashboard/sessions.svg";
import teach from "../assets/dashboard/teaching.svg";
import learn from "../assets/dashboard/learner.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPen,
  FaBookOpen,
  FaBrain,
  FaCoins,
  FaCalendarAlt,
} from "react-icons/fa";

import { BiEdit } from "react-icons/bi";

import PhotoModal from "../components/Modal/PhotoModal";
import SkillsModal from "../components/Modal/SkillsModal";
import BioModal from "../components/Modal/BioModal";
import LinkCalendarModal from "../components/Modal/LinkCalendarModal";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const [ editPhoto, setEditPhoto ] = useState(false);
  const [ editSkills, setEditSkills ] = useState(false);
  const [ editBio, setEditBio ] = useState(false);
  const [ calendar, setCalendar ] = useState(false);

  useEffect(
    () => {
      if (editPhoto || editSkills || editBio || calendar) {
        window.document.body.style.overflow = "hidden";
      } else if (!editPhoto && !editSkills && !editBio && !calendar) {
        window.document.body.style.overflow = "unset";
      }
    },
    [ editPhoto, editSkills, editBio, calendar ]
  );

  return (
    <main className="text-primary max-w-screen-xl m-auto flex items-center justify-between max-[1000px]:m-auto p-4 min-h-screen capitalize">
      {editPhoto && <PhotoModal setEditPhoto={setEditPhoto} />}
      {editSkills && <SkillsModal setEditSkills={setEditSkills} />}
      {editBio && <BioModal setEditBio={setEditBio} />}
      {calendar && <LinkCalendarModal setCalendar={setCalendar} />}

      <div className="flex gap-spaceBtwbioXScheduledLssn max-[1000px]:flex-col w-full m-auto">
        <section className="max-w-dashSKillsSection w-full text-center flex flex-col items-center ">
          <div className="flex items-center flex-col">
            <h2 className="font-title font-bold text-primary text-3xl mb-8">
              Welcome, {user ? user?.first_name : ""}
            </h2>
            <div className="h-32 w-32 rounded-full relative">
              <img
                src={user.profilePic || noUserImg}
                alt=""
                className="h-32 w-32 rounded-full object-cover border-2 border-baby"
              />
              <FaPen
                size={20}
                className="absolute right-0 top-1 cursor-pointer hover:text-grotto-100"
                onClick={() => {
                  setEditPhoto((prev) => !prev);
                }}
              />
            </div>

            <h4 className="font-bold text-grotto-100 text-xl mt-6">
              {user ? `${user.first_name} ${user.last_name}` : ""}
            </h4>
          </div>
          <div className="card p-8 max-[490px]:px-2 w-full flex flex-col items-center justify-between gap-8 relative mt-2">
            <BiEdit
              size={25}
              className="absolute top-2 right-2 cursor-pointer hover:text-grotto-100"
              onClick={() => {
                setEditSkills((prev) => !prev);
              }}
            />
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center">
                <FaBrain size={25} className="text-grotto-100" />
                <h3 className="font-bold ml-2 text-primary text-xl">Skills</h3>
              </div>

              <span className="skill-set  text-grotto-100">
                {user?.skills ? user?.skills : ""}
              </span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <FaCoins className="text-yellow-400" size={20} />
                <h3 className="text-primary text-xl font-bold">Tokens</h3>
                <span className=" bg-tokebgColor text-white w-6 h-6 rounded-full ">
                  {user.tokens ? user?.tokens : 0}
                </span>
              </div>
              <a
                href="#"
                className="flex bg-tokebgColor px-6 py-1 rounded-2xl text-white gap-2"
              >
                <span>Get more tokens</span>
                <FaCoins className="text-yellow-400" size={20} />
              </a>
            </div>
          </div>
          <div className="card justify-between max-h-96 max-[490px]:px-2 p-8 flex flex-col mt-8 relative w-full">
            <div className="flex justify-center">
              <FaBookOpen size={25} className="text-grotto-100" />
              <h3 className="font-bold ml-2 text-primary text-xl">Bio</h3>
            </div>
            <BiEdit
              size={25}
              className="absolute top-2 right-2 cursor-pointer hover:text-grotto-100"
              onClick={() => {
                setEditBio((prev) => !prev);
              }}
            />

            <div className="text-start">
              <h4 className="font-semibold text-grotto-100">About</h4>
              <p className="text-grotto-100">{user ? user?.about : ""}</p>
              <br />

              <h4 className="font-semibold text-grotto-100">Hobbies</h4>

              <p className="text-grotto-100">{user ? user?.hobbies : ""}</p>
            </div>

            <div className="text-start w-full pt-6">
              <Link
                to={`/profile/${user.id}`}
                className="btn filled bg-grotto-100 text-white px-8 py-1 rounded-2xl"
              >
                View Profile
              </Link>
            </div>
          </div>
          <div
            className="card flex items-center justify-center p-6 w-full mt-8 gap-4 max-[490px]:px-2 cursor-pointer"
            onClick={() => {
              setCalendar(true);
            }}
          >
            <p className="font-bold text-primary text-xl">
              View or Update your Calendar
            </p>
            <FaCalendarAlt
              size={25}
              className="text-grotto-100 hover:text-primary"
            />
          </div>
        </section>
        <section className="max-w-dashScheduleSection w-full">
          <div className="flex items-center flex-col gap-4  card p-8 max-[490px]:px-2 w-full">
            <h3 className="font-bold text-primary text-2xl max-[432px]:text-xl">
              Scheduled Lessons
            </h3>

            <table>
              <thead>
                <tr>
                  <th>Session</th>
                  <th>When</th>
                  <th>Who</th>
                  <th />
                  <th />
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Maths - Calculus</td>
                  <td>
                    <div className="flex flex-col items-center text-sm">
                      <span>05/01/2023</span>
                      <span>4pm</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col items-center text-sm">
                      <img src={placeholder} alt="" width={"25"} />
                      <span>John Luke</span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="bg-grotto-100 text-white max-[550px]:px-2 px-2 py-2 rounded-full hover:bg-primary"
                    >
                      Message
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="bg-primary text-white px-2 py-2 max-[550px]:px-2 rounded-full hover:bg-grotto-100"
                    >
                      Cancel
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>Language - German</td>
                  <td>
                    <div className="flex flex-col items-center">
                      <span>07/01/2023</span>
                      <span>4pm</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col items-center">
                      <img src={placeholder} alt="" width={"25"} />
                      <span>Ludwig Stein</span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="bg-grotto-100 text-white px-2 max-[550px]:px-2 py-2 rounded-full hover:bg-primary"
                    >
                      Message
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="bg-primary text-white px-2 max-[550px]:px-2 py-2 rounded-full hover:bg-grotto-100"
                    >
                      Cancel
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="text-start w-full flex gap-4">
              <a
                href="#"
                className="bg-grotto-100 hover:bg-primary px-6 max-[399px]:px-2 py-1 text-white rounded-full  border-2 border-grotto-100"
              >
                See more
              </a>
              <button

                className="px-6 max-[399px]:px-2 py-1 hover:bg-grotto-100 hover:text-white rounded-full border-2 border-grotto-100"
                onClick={() => {
                  navigate("/q");
                }}
              >
                Search for tutors
              </button>
            </div>
          </div>

          <div className="card flex flex-col items-center w-full mt-8 p-8">
            <div className="flex">
              <img src={stats} alt="" />
              <h3 className="ml-2 text-primary font-bold">Statistics</h3>
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
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
