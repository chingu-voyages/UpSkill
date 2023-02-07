import { BsFillStarFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

function SearchProfileCard({ children, id, avatar, name, bio, skills }) {
  const URL = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("clicked");
    navigate(`${URL.pathname}/${id}`);
  };
  return (
    <div className="md:w-3/4 lg:ml-8 grid grid-cols-12 my-8 bg-cardBg drop-shadow-lg mx-4 rounded-lg p-3">
      {" "}
      <div className="col-span-2 lg:col-span-1 lg:mt-4 lg:ml-4 lg:row-span-2">
        <div className="bg-ivory-75 h-16 w-16 rounded-full flex justify-center relative">
          <img
            className="rounded-full w-full object-cover"
            src={avatar}
            alt="image of mentor"
          />
        </div>

        <div className="flex lg:my-2 items-center">
          <BsFillStarFill color="#facc15" size={20} />
          <span className="font-semibold ml-2 text-grotto-100 text-xl">
            5.0
          </span>
        </div>
      </div>
      <div className="col-span-6 leading-normal lg:mt-4 lg:ml-2 ml-4">
        <h3 className="font-bold lg:text-2xl pl-4 text-primary">{name}</h3>
        <div className="text-[10px] font-normal lg:text-[14px] pl-4 text-grotto-100">
          <div>{bio.job}</div>
          <div>{bio.location}</div>
        </div>
      </div>
      <div className="col-span-4 flex flex-col lg:m-4 lg:flex-row lg:col-span-12 lg:justify-end lg:order-last">
        <button className="search-btn">Message</button>
        <button
          className="search-btn"
          onClick={() => {
            handleClick();
          }}
        >
          View profile
        </button>
      </div>
      <div className="text-[10px] lg:text-base font-semibold leading-normal col-span-10 text-grotto-100 flex gap-60">
        <div className="text-[10px] lg:text-[14px] font-normal lg:flex lg:flex-col lg:text-left my-2 text-grotto-100 ml-6">
          {/* <p>Actively Tutoring</p>
          <p>No of people: 2 </p>
          <p>Skills: {skills}</p>
          <p>Learning - Python</p> */}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default SearchProfileCard;
