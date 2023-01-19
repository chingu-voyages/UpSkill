import React from "react";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

const SendMessage = () => {
  return (
    <div className="flex items-center w-full absolute bottom-0 overflow-x-hidden bg-slate-50 p-2">
      <ImAttachment color="#265B8B" />
      <form className="w-full flex bg-slate-50">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full border-0 py-2 focus:outline-none bg-slate-50 px-2"
        />
        <button type="submit" className="inline-block w-12 ml-2">
          <MdSend color="#265B8B" />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
