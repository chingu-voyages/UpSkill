import collabImg from "../assets/landing/collab_learning.jpg";
import { FaSearch } from "react-icons/fa";

const HeroLarge = () => {
  return (
    <div className="w-full h-screen p-5">
      <div className="flex flex-row mt-20">
        <div className="w-2/3">
          <img className="my-5" src={collabImg} alt="collaboration" />
        </div>
        <div className="w-1/3 my-20 p-5">
          <div className="mb-10">
            <h1 className="text-grotto font-bold text-center text-4xl">
              Empowering individuals, <br /> building communities.
            </h1>
          </div>
          <p className="mb-10 font-bold text-primary text-sm text-center">
            Welcome to UpSkill, the platform for individuals seeking to learn
            and teach new skills while connecting with others in the community.
          </p>
          <div className="flex flex-col my-6 bg-slate-200 rounded-lg p-3">
            <label htmlFor="search" className="text-grotto font-bold text-sm">
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
  );
};

export default HeroLarge;
