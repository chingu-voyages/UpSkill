import React from "react";
import SendMessage from "./SendMessage";

const Conversations = ({ message }) => {
  return (
    <div className="overflow-x-hidden w-full relative text-primary">
      <div className="bg-slate-50  flex flex-col px-4 pt-8 mb-12 overflow-x-hidden h-chatScreenHeight">
        <span className="text-center text-xs my-2">January 15 3:00pm</span>
        <div className="">
          <div className="hidden">
            <img src="" alt="" />
          </div>
          <div className="flex">
            <span className="max-[940px]:text-base text-sm p-2 shadow-md bg-ivory-100">
              {message}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <span className="max-[940px]:text-base text-sm w-max bg-myChat shadow-md my-6  p-2">
            Yes I am. I am currently preparing my notes.
          </span>
        </div>
      </div>
      <SendMessage />
    </div>
  );
};

export default Conversations;
