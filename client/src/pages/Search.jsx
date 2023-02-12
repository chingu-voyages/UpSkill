import noUserImg from "../assets/dashboard/noUser.png";
import { FaSearch } from "react-icons/fa";
import SearchProfileCard from "../components/SearchProfileCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Search() {
  const location = useLocation();
  const [searchForm, setSearchForm] = useState(location?.state?.skill);
  const [skill, setSkill] = useState(null);
  const [mentorData, setMentorData] = useState(null);
  const [error, setError] = useState(false);
  const [inputFromHero, setInputFromHero] = useState(location?.state?.skill);
  const [inputFromHeroLg, setInputFromHeroLg] = useState(
    location?.state?.skill
  );

  const handleChange = e => {
    setSearchForm(e.target.value);
  };

  // Handle submit for native search bar
  const handleSubmit = e => {
    e.preventDefault();
    setSkill(searchForm);
    setSearchForm("");
  };

  // Handle submit for landing pages
  const handleSubmitHero = () => {
    if (inputFromHero) {
      setSkill(inputFromHero);
    } else if (inputFromHeroLg) {
      setSkill(inputFromHeroLg);
    }
  };

  // Track if form input coming from landing pages
  useEffect(() => {
    // Auto submit if form inputs from landing page detected
    handleSubmitHero();
    setInputFromHero(null);
    setInputFromHeroLg(null);
  }, [inputFromHeroLg, inputFromHero]);

  useEffect(() => {
    async function getMentorBySkill() {
      try {
        if (skill) {
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER}/user/skills?skill=${skill}`
          );
          setMentorData(res.data.users);
          if (res) {
            setError(false);
          }
        }
      } catch (error) {
        setError(true);
      }
    }
    getMentorBySkill();
  }, [skill]);

  return (
    <main className="lg:text-xl searchPageHeight">
      <div className=" md:w-3/4 lg:ml-8 flex lg:grid lg:grid-cols-12 lg:flex-row my-6 bg-cardBg drop-shadow-lg mx-4 rounded-lg p-3">
        <label
          htmlFor="search"
          className="hidden lg:flex lg:justify-center lg:items-center lg:text-xl text-primary font-bold text-sm col-span-4"
        >
          The Search Starts here
        </label>
        <form onSubmit={handleSubmit} className="my-4 col-span-7 w-full">
          <div className="flex">
            <input
              className="border border-solid rounded-tl-lg p-2 rounded-bl-lg outline-none text-sm w-full"
              name="search"
              value={searchForm}
              id="search"
              type="text"
              placeholder="Search skills"
              onChange={handleChange}
              required
            />
            <button className="text-white bg-primary w-10 p-2 rounded-tr-lg rounded-br-lg">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
      <hr className="hidden md:flex" />

      {error ? (
        <div className="md:w-3/4 lg:ml-8 flex flex-col my-6 bg-cardBg drop-shadow-lg mx-4 rounded-lg lg:p-3">
          <span className="font-bold text-primary pl-8 my-2 ">
            No mentors with that skillset
          </span>
        </div>
      ) : (
        mentorData && (
          <div className="md:w-3/4 lg:ml-8 flex flex-col my-6 bg-cardBg drop-shadow-lg mx-4 rounded-lg lg:p-3">
            <span className="font-bold text-primary pl-8 my-2 ">
              {mentorData.length} "{skill}" tutors waiting to meet you
            </span>
          </div>
        )
      )}

      {!error &&
        mentorData &&
        mentorData.map(mentor => (
          <SearchProfileCard
            key={mentor?.userId}
            avatar={mentor.profilePic || noUserImg}
            name={mentor ? `${mentor.first_name} ${mentor.last_name}` : ""}
            skills={mentor ? mentor.skills : ""}
            id={mentor?.userId}
            bio={{
              job: `${mentor ? mentor?.occupation : ""}`,
              location: `${mentor ? mentor?.location : ""}`,
            }}
          >
            {mentor ? mentor?.about : ""}
          </SearchProfileCard>
        ))}
    </main>
  );
}

export default Search;
