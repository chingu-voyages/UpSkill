import React from "react";
import avatar from "../assets/dashboard/avatar.svg";
import pencil from "../assets/dashboard/pencil.svg";
import skill from "../assets/dashboard/skills.svg";
import pen from "../assets/dashboard/pen.svg";
import coins from "../assets/dashboard/coins.svg";
import bio from "../assets/dashboard/bio.svg";
import calendar from "../assets/dashboard/calendar.svg";
import placeholder from "../assets/dashboard/placeholder.svg";
import stats from "../assets/dashboard/statistics.svg";
import session from "../assets/dashboard/sessions.svg";
import teach from "../assets/dashboard/teaching.svg";
import learn from "../assets/dashboard/learner.svg";

const Dashboard = () => {
  return (
    <div className="max-w-screen-xl my-6 flex items-center justify-between ml-14 max-[1000px]:mx-auto max-[1000px]:px-6 min-h-screen overflow-x-hidden">
      <div className="flex gap-spaceBtwbioXScheduledLssn max-[1000px]:flex-col">
        <section className="max-w-dashSKillsSection w-full text-center flex flex-col items-center">
          <div className="flex items-center flex-col">
            <h2 className="font-title font-bold text-primary text-3xl mb-8">
              Welcome, David
            </h2>
            <div className="bg-baby h-32 w-32 rounded-full flex justify-center relative">
              <img src={avatar} alt="" />
              <img
                src={pencil}
                alt=""
                className="absolute right-0 cursor-pointer"
              />
            </div>

            <h4 className="font-bold text-grotto text-xl mt-6">David Mark</h4>
          </div>
          <div className="shadow-md p-8 max-[490px]:px-2 rounded-lg w-full flex flex-col items-center justify-between max-h-80 h-full relative">
            <div className="flex">
              <img src={skill} alt="" />
              <h3 className="font-bold ml-2 text-primary text-xl">Skills</h3>
            </div>

            <img src={pen} alt="" className="absolute right-4 cursor-pointer" />
            <span className="skill-set mt-4 text-grotto">
              JavaScript, Python, UI/UX
            </span>
            <br />
            <div className="flex gap-6">
              <img src={coins} alt="" />
              <h3 className="text-primary text-xl font-bold">Tokens</h3>
              <div className="h-8 w-8 ">
                <span className="p-1 bg-tokebgColor text-white  text-center rounded-2xl">
                  50
                </span>
              </div>
            </div>
            <br />
            <a
              href="#"
              className="flex bg-tokebgColor px-6 py-1 rounded-2xl text-white gap-2"
            >
              <span>Get more tokens</span>
              <img src={coins} alt="" />
            </a>
          </div>
          <div className="shadow-md justify-between max-h-96 h-full max-[490px]:px-2 p-8 flex flex-col items-center rounded-lg mt-8 relative w-full">
            <div className="flex">
              <img src={bio} alt="" />
              <h3 className="font-bold ml-2 text-primary text-xl">Bio</h3>
            </div>
            <img src={pen} alt="" className="absolute right-4" />

            <div className="text-start">
              <h4 className="font-semibold text-grotto mt-4">About</h4>
              <p className="text-grotto">
                I’m David Mark from Argentina. I’m looking to trade my computer
                coding skills in order to learn German and Maths
              </p>
              <br />

              <h4 className="font-semibold text-grotto">Hobbies</h4>

              <p className="text-grotto">
                I love running, reading and meeting new people
              </p>
            </div>

            <div className="text-start w-full pt-6">
              <a
                href="#"
                className="btn filled bg-grotto text-white px-4 py-1 rounded-2xl inline-block text-start"
              >
                View Profile
              </a>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center justify-center h-48 w-full shadow-md mt-8 rounded-lg max-[490px]:px-2"
          >
            <p className="font-bold text-primary text-xl">
              View or Update your calendar
            </p>
            <img src={calendar} alt="" className="ml-6" />
          </a>
        </section>
        <section className="max-w-dashScheduleSection w-full">
          <div className="flex items-center flex-col gap-4 w-full shadow-md p-8 max-[490px]:px-2 w-full">
            <h3 className="font-bold text-primary text-2xl max-[432px]:text-xl">
              Scheduled Lessons
            </h3>

            <table>
              <thead>
                <tr>
                  <th>Session</th>
                  <th>When</th>
                  <th>Who</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Maths - Calculus</td>
                  <td>
                    <div className="flex flex-col items-center">
                      <span>05/01/2023</span>
                      <span>4pm</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col items-center">
                      <img src={placeholder} alt="" width={"25"} />
                      <span>John Luke</span>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="bg-grotto text-white max-[550px]:px-2 px-6 py-2 rounded-full hover:bg-primary"
                    >
                      Message
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="bg-primary text-white px-6 py-2 max-[550px]:px-2 rounded-full hover:bg-grotto"
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
                      className="bg-grotto text-white px-6 max-[550px]:px-2 py-2 rounded-full hover:bg-primary"
                    >
                      Message
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="bg-primary text-white px-6 max-[550px]:px-2 py-2 rounded-full hover:bg-grotto"
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
                className="bg-grotto hover:bg-primary px-6 max-[399px]:px-2 py-1 text-white rounded-full  outline outline-2 border-none outline-grotto"
              >
                See more
              </a>
              <a
                href="#"
                className="px-6 max-[399px]:px-2 py-1 hover:bg-grotto hover:text-white rounded-full outline outline-2 border-none outline-grotto"
              >
                Search for tutors
              </a>
            </div>
          </div>
          <div className="flex items-center w-full flex-col mt-8 shadow-md rounded-lg">
            <div className="flex ">
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
                <span className="mt-4 text-grotto text-xl">12</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <img src={teach} alt="" />
                  <h4 className="ml-2 text-primary font-semibold">Teaching</h4>
                </div>
                <span className="mt-4 text-grotto text-xl">4</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center">
                  <img src={learn} alt="" />
                  <h4 className="ml-2 text-primary font-semibold">Learning</h4>
                </div>
                <span className="mt-4 text-grotto text-xl">8</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
