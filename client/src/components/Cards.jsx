import bookBoy from "../assets/landing/boy_book_nobg.png";
import rocket from "../assets/landing/rocket.png";

const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row lg:justify-around lg:p-30">
      <div className="w-full bg-winkle lg:rounded-lg lg:w-2/6 ">
        <img
          className="mx-auto max-w-xs"
          src={bookBoy}
          alt="boy sitting on book"
        />
        <h4 className="text-xl text-center font-bold">
          Participate from anywhere
        </h4>
        <p className="p-5 leading-6">
          We believe that diversity and inclusivity are key to building a strong
          and vibrant community. That's why we welcome members from all walks of
          life and all corners of the globe. So come and join us, from where
          ever you are.
        </p>
        <div className="flex justify-center pb-16 md:pb-0">
          <button className="font-bold bg-grotto py-2 px-4 rounded-lg text-white">
            Find out more
          </button>
        </div>
      </div>
      <div className="w-full h-screen bg-rocketBg lg:rounded-lg lg:w-2/6">
        <img
          className="mx-auto mt-10 max-w-[300px]"
          src={rocket}
          alt="a rocket ship blasting off"
        />
        <h4 className="text-xl text-center font-bold text-ivory mt-5">
          Ready to Go?
        </h4>
        <p className="text-ivory leading-6 p-5">
          Come on in and see what skills people are sharing. Like what you see?
          Sign up, join the community and learn what you’ve always wanted to!
        </p>
        <div className="flex justify-center">
          <button className="font-bold bg-baby py-2 px-4 rounded-lg text-ivory">
            Search for tutors
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
