import collabImg from "../assets/landing/collab_learning.jpg";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { searchSkills } from "../features/search/search-slice";
import { useSelector, useDispatch } from "react-redux";

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchSkill.searchQuery);

  const handleChange = (e) => {
    dispatch(searchSkills(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/q", { state: { skill: `${searchQuery}` } });
  };

  return (
    <div className="w-full h-screen p-5">
      <div className="flex flex-col mt-20">
        <div className="mb-3 lg:mb-10">
          <h1 className="text-grotto-100 font-bold text-center text-2xl">
            Empowering individuals, <br /> building communities.
          </h1>
        </div>
        <img
          className="my-5 w-[350px] mx-auto"
          src={collabImg}
          alt="collaboration"
        />
        <p className="font-bold text-primary text-sm text-center">
          Welcome to UpSkill, the platform for individuals seeking to learn and
          teach new skills while connecting with others in the community.
        </p>
        <div className="flex flex-col my-6 bg-slate-200 rounded-lg p-3">
          <label htmlFor="search" className="text-grotto-100 font-bold text-sm">
            What would you like to learn?
          </label>
          <form onSubmit={handleSubmit}>
            <div className="flex mt-2">
              <input
                className="border-solid rounded-tl-lg p-2 rounded-bl-lg text-sm w-full"
                name="search"
                value={searchQuery}
                type="text"
                placeholder="Search skills"
                required
                onChange={handleChange}
              />
              <button className="text-white bg-primary w-10 p-2 rounded-tr-lg rounded-br-lg">
                <FaSearch />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
