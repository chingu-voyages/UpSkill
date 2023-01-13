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
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <main className="text-primary max-w-screen-xl m-auto flex items-center justify-between max-[1000px]:m-auto p-4 min-h-screen ">
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

            <h4 className="font-bold text-grotto-100 text-xl mt-6">
              David Mark
            </h4>
          </div>
          <div className="card p-8 max-[490px]:px-2 w-full flex flex-col items-center justify-between max-h-80 h-full relative mt-4">
            <div className="flex flex-col items-center">
              <div className="flex">
                <img src={skill} alt="" className="w-4" />
                <h3 className="font-bold ml-2 text-primary text-xl">Skills</h3>
              </div>
              <img
                src={pen}
                alt=""
                className="absolute right-4 cursor-pointer"
              />
              <span className="skill-set  text-grotto-100 mt-4">
                JavaScript, Python, UI/UX
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-2 mb-6">
                <img src={coins} alt="" />
                <h3 className="text-primary text-xl font-bold">Tokens</h3>
                <div className="h-8 w-8 ">
                  <span className="p-1 bg-tokebgColor text-white  text-center rounded-2xl">
                    50
                  </span>
                </div>
              </div>
              <a
                href="#"
                className="flex bg-tokebgColor px-6 py-1 rounded-2xl text-white gap-2"
              >
                <span>Get more tokens</span>
                <img src={coins} alt="" />
              </a>
            </div>
          </div>
          <div className="card justify-between max-h-96 h-full max-[490px]:px-2 p-8 flex flex-col items-center mt-8 relative w-full">
            <div className="flex">
              <img src={bio} alt="" />
              <h3 className="font-bold ml-2 text-primary text-xl">Bio</h3>
            </div>
            <img src={pen} alt="" className="absolute right-4 cursor-pointer" />

            <div className="text-start">
              <h4 className="font-semibold text-grotto-100 mt-4">About</h4>
              <p className="text-grotto-100">
                I’m David Mark from Argentina. I’m looking to trade my computer
                coding skills in order to learn German and Maths
              </p>
              <br />

              <h4 className="font-semibold text-grotto-100">Hobbies</h4>

              <p className="text-grotto-100">
                I love running, reading and meeting new people
              </p>
            </div>

            <div className="text-start w-full pt-6">
              <a
                href="#"
                className="btn filled bg-grotto-100 text-white px-8 py-1 rounded-2xl"
              >
                View Profile
              </a>
            </div>
          </div>
          <a
            href="#"
            className="card flex items-center justify-center h-48 w-full mt-8  max-[490px]:px-2"
          >
            <p className="font-bold text-primary text-xl">
              View or Update your calendar
            </p>
            <img src={calendar} alt="" className="ml-6" />
          </a>
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
                      className="bg-grotto-100 text-white max-[550px]:px-2 px-6 py-2 rounded-full hover:bg-primary"
                    >
                      Message
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="bg-primary text-white px-6 py-2 max-[550px]:px-2 rounded-full hover:bg-grotto-100"
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
                      className="bg-grotto-100 text-white px-6 max-[550px]:px-2 py-2 rounded-full hover:bg-primary"
                    >
                      Message
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="bg-primary text-white px-6 max-[550px]:px-2 py-2 rounded-full hover:bg-grotto-100"
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
                className="bg-grotto-100 hover:bg-primary px-6 max-[399px]:px-2 py-1 text-white rounded-full  outline outline-2 border-none outline-grotto-100"
              >
                See more
              </a>
              <a
                href="#"
                className="px-6 max-[399px]:px-2 py-1 hover:bg-grotto-100 hover:text-white rounded-full outline outline-2 border-none outline-grotto-100"
              >
                Search for tutors
              </a>
            </div>
          </div>
          <div className="flex items-center w-full flex-col mt-8 card p-8">
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
