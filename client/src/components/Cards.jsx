import { Link } from "react-router-dom";
import bookBoy from "../assets/landing/boy_book_nobg.png";
import rocket from "../assets/landing/rocket.png";

const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around md:justify-center lg:justify-around md:gap-4 items-center gap-20 p-4 mb-12">
      <div className=" bg-winkle md:h-[41rem] w-[80%] rounded-lg lg:w-2/6 flex flex-col items-center justify-around p-4">
        <img
          className="mx-auto max-w-[200px] sm:sm:max-w-[280px]"
          src={bookBoy}
          alt="boy sitting on book"
        />
        <h4 className="text-xl text-center font-bold text-primary">
          Participate from anywhere
        </h4>
        <p className="p-5 leading-6 sm:max-w-full text-center text-primary">
          We believe that diversity and inclusivity are key to building a strong
          and vibrant community. That's why we welcome members from all walks of
          life and all corners of the globe. So come and join us, from where
          ever you are.
        </p>
        <div className="flex justify-center pb-16 md:pb-0">
          <button className="font-bold bg-grotto-100 py-2 px-4 rounded-lg text-white">
            Find out more
          </button>
        </div>
      </div>
      <div className=" bg-rocketBg md:h-[41rem] w-[80%] rounded-lg lg:w-2/6 flex flex-col items-center justify-around p-4">
        <img
          className="mx-auto mt-10 max-w-[200px] sm:max-w-[280px]"
          src={rocket}
          alt="a rocket ship blasting off"
        />
        <h4 className="text-xl text-center font-bold text-ivory-100 mt-5">
          Ready to Go?
        </h4>
        <p className="text-ivory-100 leading-6 p-5 text-center">
          Come on in and see what skills people are sharing. Like what you see?
          Sign up, join the community and learn what you’ve always wanted to!
        </p>

        <div className="flex justify-center">
          <Link to="/q">
            <button className="font-bold bg-baby py-2 px-4 rounded-lg text-primary">
              Search for tutors
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
