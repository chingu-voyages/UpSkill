import React from "react";

const Chats = ({ avi, name, date, message, setOpenMsg }) => {
  const handleOpenMsg = () => {
    setOpenMsg(true);
  };
  return (
    <div
      className="flex items-center mt-4 cursor-pointer"
      onClick={handleOpenMsg}
    >
      <div className="h-10 w-12 ">
        <img
          src={avi}
          alt=""
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col w-full ml-4">
        <div className="flex items-center justify-between w-full">
          <p className="max-[390px]:text-lg font-bold text-primary">{name}</p>
          <span className="text-winkle text-xs">{date}</span>
        </div>
        <p className="max-[394px]:text-base text-left text-winkle text-xs mt-px">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Chats;
