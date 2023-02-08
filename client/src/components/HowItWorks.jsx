import stepOne from "../assets/landing/step_1.jpg";
import stepTwo from "../assets/landing/step_2.png";
import stepThree from "../assets/landing/step_3.jpg";

const HowItWorks = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:h-screen">
      <div>
        <h1 className="text-center text-2xl font-bold text-grotto-100 mt-10 mb-10 lg:text-4xl">
          How it works
        </h1>
      </div>
      <div className="flex flex-col lg:flex lg:flex-row lg:justify-end ">
        <div className="flex flex-col items-center gap-6 max-[450px]:min-h-[550px] min-h-[600px] lg:w-1/3">
          <span
            className="font-bold
          text-grotto-100 border-solid border-2 border-slate-300 rounded-full p-2 inline-block w-10 text-center"
          >
            1
          </span>
          <span className="font-bold inline-block text-primary">
            Find or become a tutor
          </span>
          <img className="max-w-xs" src={stepOne} alt="searching for mentor" />
          <p className="text-center text-primary leading-6 px-5 lg:text-left max:[400px]:max-w-[350px]">
            Find a tutor, become a tutor for others or do both! Simply search
            for a tutor and book a session.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 lg:w-1/3 min-h-[550px]">
          <span
            className="font-bold
          text-grotto-100 border-solid border-2 border-slate-300 rounded-full p-2 inline-block w-10 text-center"
          >
            2
          </span>
          <span className="font-bold inline-block text-primary">
            Learn and/or tutor others
          </span>
          <img
            className="max-w-xs"
            src={stepTwo}
            alt="mentor teaching student"
          />
          <p className="text-center text-primary leading-6 px-5 lg:text-left max:[400px]:max-w-[350px]">
            When you’ve found a tutor book a session. You can either exchange a
            skill you have that your tutor wants to learn or exchange tokens
            that your tutor can use to trade for skills in the future.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6 lg:w-1/3 min-h-[600px]">
          <span
            className="font-bold
          text-grotto-100 border-solid border-2 border-slate-300 rounded-full p-2 inline-block w-10 text-center"
          >
            3
          </span>
          <span className="font-bold inline-block text-primary z-10">
            Reap the Rewards!
          </span>
          <img
            className="max-w-xs lg:-mt-12"
            src={stepThree}
            alt="student celebrating"
          />
          <p className="text-center text-primary leading-6 -my-5 px-5 lg:text-left max:[400px]:max-w-[350px]">
            Each new member gets free tokens to start booking tuition
            immediately. You too can earn tokens by sharing your skills: learn
            and never spend a penny!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
