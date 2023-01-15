import React from "react";

function Reviews({ avatar, name, children }) {
  return (
    <div className="grid justify-items-center md:pr-4 md:border-y-2 md:w-full md:border-ivory-50 md:grid-cols-5">
      <div className="bg-ivory-75 h-14 w-14 my-4 rounded-full flex justify-center relative">
        <img src={avatar} alt="" width={39} height={42} />
      </div>
      <div className="md:col-span-4 md:my-4 md:w-full">
        <h3 className="font-bold md:my-2 md:text-lg text-primary md:text-start text-center text-xl">
          {name}
        </h3>
        <div className="text-base md:font-semibold font-medium text-justify text-grotto-100 md:p-0 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
