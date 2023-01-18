import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import ButtonUse from "./ButtonUse";

function SearchProfileCard({ children, avatar, name, bio }) {
  return (
    <div className="md:w-3/4 lg:ml-8 grid grid-cols-12 my-8 bg-cardBg drop-shadow-lg mx-4 rounded-lg p-3">
      {" "}
      <div className="col-span-2 lg:col-span-1 lg:mt-4 lg:ml-4 lg:row-span-2">
        <div className="bg-ivory-75 h-16 w-16 rounded-full flex justify-center relative">
          <img src={avatar} alt="" width={39} height={42} />
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
        <ButtonUse>Message</ButtonUse>
        <ButtonUse>View profile</ButtonUse>
      </div>
      <div className="text-[10px] lg:text-xl font-semibold leading-normal col-span-10 text-grotto-100">
        <div className="text-[10px] lg:text-[14px] font-normal lg:flex lg:flex-col lg:text-center my-2 text-grotto-100">
          <p>Actively Tutoring</p>
          <p>No of people: 2 </p>
          <p>Skills: CopyWriting & German</p>
          <p>Learning - Python</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default SearchProfileCard;
