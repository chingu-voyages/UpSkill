import { useState } from "react";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

function BioDetails({ children, title }) {
  const [state, setstate] = useState(false);
  return (
    <div className="w-full p-2 border-b-2 border-ivory-50">
      <div className="flex w-full justify-between">
        <h3 className="font-bold ml-2 text-grotto-100 text-xl">{title}</h3>
        {state ? (
          <RiArrowDropUpLine
            className="fill-grotto-100 cursor-pointer"
            size={30}
            onClick={() => setstate(p => !p)}
          />
        ) : (
          <RiArrowDropDownLine
            className="fill-grotto-100 cursor-pointer"
            size={30}
            onClick={() => setstate(p => !p)}
          />
        )}
      </div>
      <div
        className={`text-xs md:text-sm text-justify text-grotto-100 p-2 ${
          state ? "" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default BioDetails;
