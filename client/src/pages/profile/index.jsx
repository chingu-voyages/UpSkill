import React, { useEffect, useState } from "react";
import avatar from "../../assets/dashboard/avatar.svg";
import bio from "../../assets/dashboard/bio.svg";
import badge from "../../assets/profil/badge.svg";
import pen from "../../assets/dashboard/pen.svg";
import skill from "../../assets/dashboard/skills.svg";
import wantedSkill from "../../assets/profil/skill.svg";
import stats from "../../assets/dashboard/statistics.svg";
import session from "../../assets/dashboard/sessions.svg";
import teach from "../../assets/dashboard/teaching.svg";
import learn from "../../assets/dashboard/learner.svg";
import { BsFillStarFill } from "react-icons/bs";
import calendar from "../../assets/dashboard/calendar.svg";
import Reviews from "../../components/Reviews";
import BioDetails from "../../components/BioDetails";

import ReviewModal from "../../components/Modal/ReviewModal";

function Profil() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  return (
    <main className="lg:flex lg:h-max lg:items-center">
      <ReviewModal />
      <div className="lg:flex lg:h-max lg:flex-row lg:justify-between ">
        <section className="lg:ml-8 lg:w-1/3">
          <div className="flex items-center flex-col lg:h-auto lg:my-12">
            <h2 className="font-title font-bold text-primary text-3xl mb-8">
              Hi, I'm David 👋
            </h2>
            <div className="bg-baby h-32 w-32 rounded-full flex justify-center relative">
              <img src={avatar} alt="" />
              <img
                src={badge}
                alt=""
                className="absolute right-0 bottom-0 cursor-pointer"
              />
            </div>
            <h4 className="font-bold text-grotto-100 text-xl mt-6">
              David Mark
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
                Ratings count
              </div>
            </div>
          </div>
          <div className="card lg:my-12 lg:h-auto mx-4 my-6 flex flex-col items-center justify-between h-full relative">
            <div className="flex flex-col items-center my-4">
              <div className="flex">
                <img src={skill} alt="" className="w-6" />
                <h3 className="font-bold ml-2 text-primary text-xl">
                  Skills offered
                </h3>
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
            <div className="flex flex-col items-center my-4">
              <div className="flex">
                <img src={wantedSkill} alt="" className="w-6" />
                <h3 className="font-bold ml-2 text-primary text-xl">
                  Skills wanted
                </h3>
              </div>
              <span className="skill-set  text-grotto-100 mt-4">
                Mathematics, German tuition
              </span>
            </div>
          </div>
          <div className="card lg:my-12 lg:h-auto mx-4 my-6  flex flex-col items-center justify-between lg:justify-center h-full relative">
            <div className="flex flex-col items-center my-4">
              <h3 className="font-bold ml-2 text-primary text-xl">
                Misson Statement
              </h3>
              <img
                src={pen}
                alt=""
                className="absolute right-4 cursor-pointer"
              />
              <span className="skill-set text-grotto-100 p-4 text-justify">
                I want to learn how to speak German better, as I will be
                travelling in Germany next year. I’d also like to improve my
                mathematice as I’ll be studying for a masters next year. <br />{" "}
                <br /> I am currently a software engineer and owuld be happy to
                meet anyone wanting to improve their skills, pick up a computer
                programming language, or who wants advice on breaking into tech.
              </span>
            </div>
          </div>
          {width >= 1024 ? (
            <div className="card lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full">
              <div className="flex p-2 w-full justify-center border-b-2 border-ivory-50">
                <h3 className="font-bold mr-2 text-primary text-xl">
                  Book a session with David
                </h3>
                <img src={calendar} alt="" className="w-6" />
              </div>
            </div>
          ) : (
            <div className="card lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full">
              <div className="flex w-full p-4 justify-center border-b-2 border-ivory-50">
                <img src={bio} alt="" className="w-6" />
                <h3 className="font-bold ml-2 text-primary text-xl">Bio</h3>
              </div>
              <BioDetails title="About">
                I’m David Mark from Argentina. I’m looking to trade my computer
                coding skills in order to learn German and Math
              </BioDetails>
              <BioDetails title="Education"></BioDetails>
              <BioDetails title="Subject"></BioDetails>
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
              <BioDetails title="About">
                I’m David Mark from Argentina. I’m looking to trade my computer
                coding skills in order to learn German and Math
              </BioDetails>
              <BioDetails title="Education"></BioDetails>
              <BioDetails title="Subject"></BioDetails>
            </div>
          ) : (
            <div className="card lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full">
              <div className="flex p-2 w-full justify-center border-b-2 border-ivory-50">
                <h3 className="font-bold mr-2 text-primary text-xl">
                  Book a session with David
                </h3>
                <img src={calendar} alt="" className="w-6" />
              </div>
            </div>
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
          <div className="card lg:my-12 mx-4 my-6 flex flex-col items-center justify-between lg:h-auto h-full">
            <h3 className="mt-2 md:text-start lg:w-full lg:ml-16 lg:my-4 text-primary font-bold text-xl">
              4 Reviews
            </h3>
            <Reviews avatar={avatar} name="James Smith">
              It was a pleasure to teach David German, he’s been a great
              student, a friendly guy and he has helped me get started with
              Python!. Thanks David!
            </Reviews>
            <Reviews avatar={avatar} name="Eric Bojangles">
              Great tutor, so patient, would definitely recommend trading skills
              with David!
            </Reviews>
            <div className="p-4">
              <a
                href="#"
                className="bg-grotto-100 hover:bg-primary px-6 max-[399px]:px-2 py-1 text-white rounded-full  outline outline-2 border-none outline-grotto-100"
              >
                See more
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profil;
