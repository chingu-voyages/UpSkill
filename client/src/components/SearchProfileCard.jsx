import { useEffect, useState } from "react";
import { BsFillStarFill, BsCheck2All } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ImAttachment } from "react-icons/im";
import { RxCrossCircled } from "react-icons/rx";
import { FiSend } from "react-icons/fi";
import { MdCancelScheduleSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { postAMessage } from "../api";
import Alert from "./Alert";

function SearchProfileCard({ children, id, avatar, name, bio, skills }) {
  const [state, setState] = useState(false);
  const [send, setSend] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const user = useSelector(state => state.user);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  const handleClick = () => {
    navigate(`/profile/${id}`);
  };
  const handleMessageClick = () => {
    setState(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSend(null);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [send]);

  const HandleSubmit = async e => {
    e.preventDefault();
    if (inputRef.current.value === "") {
      return;
    }
    const sendTheMessage = async message => {
      try {
        const response = await postAMessage("", {
          sender: user.id,
          recever: id,
          content: message,
        });

        return response.data;
      } catch (error) {
        return null;
      }
    };
    const res = await sendTheMessage(inputRef.current.value);
    inputRef.current.value = "";
    if (res !== null) {
      setState(false);
      setSend(true);
    } else {
      setSend(false);
      setState(false);
    }
  };

  return (
    <div className="md:w-3/4 lg:ml-8 grid grid-cols-12 my-8 bg-cardBg drop-shadow-lg mx-4 rounded-lg p-3">
      {" "}
      <div className="col-span-4 lg:col-span-1 lg:mt-4 lg:ml-4 lg:row-span-2">
        <div className="bg-ivory-75 h-16 w-16 rounded-full flex justify-center relative">
          <img
            className="rounded-full w-full object-cover"
            src={avatar}
            alt="image of mentor"
          />
        </div>

        <div className="flex lg:my-2 items-center">
          <BsFillStarFill color="#facc15" size={20} />
          <span className="font-semibold ml-2 text-grotto-100 text-xl">
            5.0
          </span>
        </div>
      </div>
      <div className="col-span-6 leading-normal lg:mt-4 lg:ml-2 ml-4">
        <h3 className="font-bold lg:text-2xl pl-4 text-primary">
          {name ? name : ""}
        </h3>
        <div className="text-[10px] font-normal lg:text-[14px] pl-4 text-grotto-100">
          <div>{bio ? bio?.job : ""} </div>
          <div>{bio ? bio?.location : ""}</div>
        </div>
      </div>
      <div
        className={`flex ${
          screenSize <= 500 && state
            ? "col-span-12 flex-row order-last"
            : "flex-col col-span-4"
        } lg:m-4 lg:flex-row lg:col-span-12 lg:justify-end lg:order-last`}
      >
        {state ? (
          <div className="flex items-center w-full overflow-x-hidden bg-slate-50 p-2">
            <ImAttachment color="#265B8B" className="mr-2" />
            <form
              className="w-full flex items-center bg-slate-50"
              onSubmit={HandleSubmit}
            >
              <input
                type="text"
                placeholder="Type a message"
                className={`border border-solid rounded-lg px-2 ${
                  screenSize <= 500 ? "h-[30px]" : "py-2"
                } outline-none text-sm w-full`}
                ref={inputRef}
              />
              <button className="search-btn font-bold m-2" type="submit">
                {screenSize <= 500 ? <FiSend /> : "send"}
              </button>
            </form>
            <button
              className="search-btn bg-red-400 border-red-400 hover:bg-rose-800 font-bold m-0"
              onClick={() => {
                setState(false);
              }}
            >
              {screenSize <= 500 ? <MdCancelScheduleSend /> : "cancel"}
            </button>
          </div>
        ) : (
          <>
            {user.id !== id && (
              <button className="search-btn" onClick={handleMessageClick}>
                Message
              </button>
            )}
            <button className="search-btn" onClick={handleClick}>
              View profile
            </button>
          </>
        )}
      </div>
      {screenSize <= 500 && state ? null : (
        <div
          className="
      text-[10px] lg:text-base lg:ml-4 font-semibold leading-normal col-span-8 text-grotto-100 flex gap-60"
        >
          {children}
        </div>
      )}
      {send === true ? (
        <Alert color="#2d9a2dd9" position="top-0 right-0">
          {screenSize >= 500 ? "Messsage sent" : null}
          <BsCheck2All className="ml-2" size={15} />
        </Alert>
      ) : send === false ? (
        <Alert color="#e50e0ee3" position="top-0 right-0">
          {screenSize >= 500 ? "Message not sent. Retry " : null}
          <RxCrossCircled className="ml-2" size={15} />
        </Alert>
      ) : null}
    </div>
  );
}

export default SearchProfileCard;
