import collabImg from "../assets/landing/collab_learning.jpg";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="w-full h-screen p-5">
      <div className="mt-10">
        <div className="flex flex-col md:flex-row">
          <div className="order-2">
            <img
              className="my-5 w-[350px] mx-auto md:w-[900px]"
              src={collabImg}
              alt="collaboration"
            />
          </div>
          <div className="flex flex-col md:mt-0 md:p-5 md:w-1/2 xl:mt-20">
            <div className="order-1 mb-3 lg:mb-10">
              <h1 className="text-grotto font-bold text-center md:text-3xl">
                Empowering individuals, <br /> building communities.
              </h1>
            </div>
            <div className="md:h-1">
              <div className="lg:mb-10">
                <p className="font-bold text-primary text-sm text-center">
                  Welcome to UpSkill, the platform for individuals seeking to
                  learn and teach new skills while connecting with others in the
                  community.
                </p>
              </div>
              <div className="flex flex-col my-6 bg-slate-200 rounded-lg p-3">
                <label
                  htmlFor="search"
                  className="text-grotto font-bold text-sm"
                >
                  What would you like to learn?
                </label>
                <form action="#">
                  <div className="flex mt-2">
                    <input
                      className="border-solid rounded-tl-lg p-2 rounded-bl-lg text-sm w-full"
                      name="search"
                      type="text"
                      placeholder="Search skills"
                    />
                    <button className="text-white bg-primary w-10 p-2 rounded-tr-lg rounded-br-lg">
                      <FaSearch />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default Hero;
