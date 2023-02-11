import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdFilterList } from "react-icons/md";

const ChatSearchInput = ({ text, placeholder }) => {
  const [filtered, setFiltered] = useState(false);
  const handleFilter = () => {
    setFiltered(prev => !prev);
  };
  return (
    <div className=" flex items-center w-full">
      <div className="relative flex items-center rounded-lg bg-slate-100 w-full">
        <input
          type={text}
          placeholder={placeholder}
          className="border-0 pl-6 pr-2 py-2 focus:outline-none bg-transparent w-full "
        />
        <BiSearch color="#265B8B" className="absolute left-1" />
      </div>

      {filtered ? (
        // Filter for unread messages
        <div
          className="bg-grotto-100 text-white ml-2 text-lg flex items-center justify-center w-6 h-6 rounded-full cursor-pointer"
          onClick={handleFilter}
        >
          <MdFilterList color="#265B8B" />
        </div>
      ) : (
        <div className="w-6 h-6 ml-2 flex items-center justify-center text-lg cursor-pointer">
          <MdFilterList color="#265B8B" onClick={handleFilter} />
        </div>
      )}
    </div>
  );
};

export default ChatSearchInput;
