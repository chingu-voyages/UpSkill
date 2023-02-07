import { useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";

function Reviews({ avatar, name, children, id }) {
  // useEffect(()=>{

  //   //GET user profile photo from id
  //   //SET all info into state
  // },[])
  return (
    //Use the state
    <div className="grid justify-items-center md:pr-4 md:border-y-2 md:w-full md:border-ivory-50 md:grid-cols-5">
      <div className="bg-ivory-75 h-14 w-14 my-4 rounded-full flex justify-center relative">
        <img src={avatar} alt="" width={39} height={42} />
      </div>
      <div className="md:col-span-4 md:my-4 md:w-full">
        <div className="flex items-center gap-4 px-4 md:p-0">
          <h3 className="font-bold md:my-2 md:text-lg text-primary md:text-start text-center text-xl">
            {name}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text">5</span>
            <BsFillStarFill color="#facc15" />
          </div>
        </div>

        <div className=" text-base md:font-semibold font-medium text-justify text-grotto-100 md:p-0 p-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
