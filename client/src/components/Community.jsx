import { Link } from "react-router-dom";
import community from "../assets/landing/community_nobg.png";

const Community = () => {
  return (
    <div className="flex flex-col mt-[10rem] min-[350px]:mt-4 h-screen justify-center bg-baby">
      <div className="lg:flex lg:flex-row">
        <img
          className="-mt-20 lg:w-full  m:w-full min-w-[300px] overflow-hidden"
          src={community}
          alt="community"
        />
        <div className="flex flex-col w-full justify-center m-auto lg:w-1/3 lg:mr-40">
          <div className="-mt-10 p-5">
            <h1 className="text-xl text-primary text-center font-bold mb-5 lg:text-4xl">
              Connect, learn, and grow together.
            </h1>
            <p className="text-center text-primary leading-6">
              Our platform is designed to foster collaboration and connection.
              You'll be able to connect with others who share your interests and
              goals, and you'll be able to tap into the collective knowledge and
              experience of our community.
            </p>
            <div className="flex justify-center w-full mt-8">
              <Link to="/auth">
                <button className="min-w-[250px] text-slate-100 rounded-lg p-2 bg-grotto-100">
                  Join the community
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
