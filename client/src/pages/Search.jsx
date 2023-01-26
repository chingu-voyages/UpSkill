import React from "react";
import avatar from "../assets/dashboard/avatar.svg";
import { FaSearch } from "react-icons/fa";
import SearchProfileCard from "../components/SearchProfileCard";

function Search() {
  return (
    <main className="lg:text-xl">
      <div className=" md:w-3/4 lg:ml-8 flex lg:grid lg:grid-cols-12 lg:flex-row my-6 bg-cardBg drop-shadow-lg mx-4 rounded-lg p-3">
        <label
          htmlFor="search"
          className="hidden lg:flex lg:justify-center lg:items-center lg:text-xl text-primary font-bold text-sm col-span-4"
        >
          The Search Start here
        </label>
        <form action="#" className="my-4 col-span-7 w-full">
          <div className="flex">
            <input
              className="border border-solid rounded-tl-lg p-2 rounded-bl-lg text-sm w-full"
              name="search"
              type="text"
            />
            <button className="text-white bg-primary w-10 p-2 rounded-tr-lg rounded-br-lg">
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
      <hr className="hidden md:flex" />
      <div className="md:w-3/4 lg:ml-8 flex flex-col my-6 bg-cardBg drop-shadow-lg mx-4 rounded-lg lg:p-3">
        <span className="font-bold text-primary pl-8 my-2 ">
          87 “Maths” tutors waiting to meet you
        </span>
      </div>
      <SearchProfileCard
        avatar={avatar}
        name="James Smith"
        bio={{ job: "Social Media Manager", location: "Germany" }}
      >
        Hi, I’m James, I’m looking to help people with their German, I like
        meeting new people, I’m really patient and love explaining grammar
        concept. Would love to meet a passionate and patient programmer to take
        the time to teach me the basics of Python and ML. Can’t wait to meet
        you! 🙂
      </SearchProfileCard>
      <SearchProfileCard
        avatar={avatar}
        name="James Smith"
        bio={{ job: "Social Media Manager", location: "Germany" }}
      >
        Hi, I’m James, I’m looking to help people with their German, I like
        meeting new people, I’m really patient and love explaining grammar
        concept. Would love to meet a passionate and patient programmer to take
        the time to teach me the basics of Python and ML. Can’t wait to meet
        you! 🙂
      </SearchProfileCard>
    </main>
  );
}

export default Search;
