import React, { useState, useEffect, useRef } from "react";
import Chats from "../components/messages/Chats";
import noUserProfile from "../assets/dashboard/noUser.png";
import ChatSearchInput from "../components/messages/ChatSearchInput";
import { IoIosArrowBack } from "react-icons/io";
import { io } from "socket.io-client";
import Conversations from "../components/messages/Conversations";
import { conversations } from "../features/messages/messages-slice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";

const Messaging = () => {
  const [openMsg, setOpenMsg] = useState(false);
  const [seeMessages, setSeeMessages] = useState({});
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isConnected, setIsConnected] = useState(true);
  const user = useSelector(state => state.user);
  const conversationList = useSelector(state => state.messages.conversations);
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected) {
      socket.current = io(import.meta.env.VITE_SERVER);
      socket.current.on("connect", () => {
        setIsConnected(true);
      });
      socket.current.on("connect_error", () => {
        setIsConnected(false);
      });
    }

    return () => {
      socket.current.disconnect();
    };
  }, [isConnected]);

  useEffect(() => {
    if (user.id !== null) {
      dispatch(conversations(user.id));
      socket.current?.emit("setConnectedUser", { userId: user?.id });
    }
  }, [user]);

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenSize]);

  return (
    <>
      {screenSize <= 940 ? (
        <div className="h-screen overflow-auto ">
          {!openMsg ? (
            <div className="px-4 w-full">
              <h2 className="font-bold font-title text-2xl text-primary pb-2">
                Chats
              </h2>
              <ChatSearchInput text="text" placeholder="Search" />
              {conversationList?.map(value => {
                return (
                  <Chats
                    key={value?.user.id}
                    correspondance={value?.user.userId}
                    avi={`${value?.user.profilePic || noUserProfile}`}
                    name={`${value?.user.first_name} ${value?.user.last_name}`}
                    conversationId={value?.conversation_id}
                    date="Yesterday"
                    message="View messages"
                    setOpenMsg={setOpenMsg}
                    setSeeMessages={setSeeMessages}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full">
              <div className="z-10 bg-white">
                <div className="flex items-center w-44 justify-between p-4">
                  <IoIosArrowBack
                    className="cursor-pointer text-primary text-2xl"
                    onClick={() => setOpenMsg(false)}
                  />
                  <div className="flex items-center">
                    <div className="h-10 w-10">
                      <img
                        src={`${seeMessages?.avi}`}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="ml-4 text-primary text-lg font-bold">
                      {`${seeMessages?.name}`}
                    </span>
                  </div>
                </div>
              </div>

              <Conversations
                openMsg={openMsg}
                conversationId={seeMessages?.conversationId}
                correspondance={seeMessages?.correspondance}
                socket={socket}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="h-chatScreenHeight flex overflow-x-hidden">
          <div className="px-4 max-w-sm overflow-auto">
            <h2 className="font-bold font-title text-2xl text-primary pb-2">
              Chats
            </h2>
            <ChatSearchInput text="text" placeholder="Search" />
            {conversationList?.map(value => {
              return (
                <Chats
                  key={value?.user.id}
                  avi={`${value?.user.profilePic || noUserProfile}`}
                  correspondance={value?.user.userId}
                  name={`${value?.user.first_name} ${value?.user.last_name}`}
                  conversationId={value?.conversation_id}
                  date="Yesterday"
                  message="View messages"
                  setOpenMsg={setOpenMsg}
                  setSeeMessages={setSeeMessages}
                />
              );
            })}
          </div>
          <div className="w-full overflow-auto ">
            <div className="bg-white w-full">
              <div className="flex items-center w-44 justify-between p-4">
                {screenSize <= 940 && (
                  <IoIosArrowBack
                    className="cursor-pointer text-primary text-2xl"
                    onClick={() => setOpenMsg(false)}
                  />
                )}
                {openMsg && (
                  <div className="flex items-center">
                    <div className="h-10 w-10">
                      <img
                        src={`${seeMessages?.avi}`}
                        alt=""
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="ml-4 font-bold text-primary">{`${seeMessages?.name}`}</span>
                  </div>
                )}
              </div>
            </div>

            <Conversations
              openMsg={openMsg}
              conversationId={seeMessages?.conversationId}
              correspondance={seeMessages?.correspondance}
              socket={socket}
            />
          </div>
        </div>
      )}
      {!isConnected && (
        <Alert color="#f20042" position="bottom-0 left-0">
          Something wrong. Reload
        </Alert>
      )}
    </>
  );
};

export default Messaging;
