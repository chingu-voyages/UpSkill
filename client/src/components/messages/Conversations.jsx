import React from "react";
import SendMessage from "./SendMessage";

const Conversations = ({ message }) => {
  return (
    <div className="overflow-x-hidden w-full relative">
      <div className="bg-slate-50  flex flex-col px-4 pt-20 overflow-x-hidden h-chatScreenHeight">
        <span className="text-center text-xs my-2">January 15 3:00pm</span>
        <div className="">
          <div className="hidden">
            <img src="" alt="" />
          </div>
          <div className="flex inline">
            <span className="max-[940px]:text-base text-sm p-2 shadow-md bg-ivory-100">
              {message}
            </span>
          </div>
        </div>
        <div className="flex inline justify-end ">
          <span className="max-[940px]:text-base text-sm w-max bg-myChat shadow-md my-6  p-2">
            Yes I am. I am currently preparing my notes.
          </span>
        </div>
        <span className="text-center text-xs my-2">January 15 3:00pm</span>
        <div className="">
          <div className="hidden">
            <img src="" alt="" />
          </div>
          <div className="flex inline">
            <span className="max-[394px]:text-base text-sm p-2 shadow-md bg-ivory-100">
              {message}
            </span>
          </div>
        </div>
        <div className="flex inline justify-end mb-10">
          <span className="max-[394px]:text-base text-sm w-max bg-myChat shadow-md my-6  p-2">
            Yes I am. I am currently preparing my notes.
          </span>
        </div>
      </div>
      <SendMessage />
    </div>
  );
};

export default Conversations;
