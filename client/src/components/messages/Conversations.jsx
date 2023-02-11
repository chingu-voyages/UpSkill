import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../api";
import Alert from "../Alert";
import SendMessage from "./SendMessage";

const Conversations = ({ conversationId, openMsg, socket, correspondance }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const userId = useSelector(state => state.user.id);
  useEffect(() => {
    if (arrivalMessages !== null) {
      setMessages(sms => [...sms, arrivalMessages]);
    }
  }, [arrivalMessages]);

  useEffect(() => {
    socket.current?.on("getMessage", data => {
      data.correspondance === correspondance &&
        setArrivalMessages({
          sender: data.correspondance,
          content: data.message,
        });
    });
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (conversationId !== undefined) {
        try {
          const response = await getMessages(conversationId);
          setMessages(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMessages();
  }, [conversationId]);

  return (
    <div className="overflow-x-hidden w-full relative text-primary">
      {openMsg ? (
        <>
          <div className="bg-slate-50  flex flex-col px-4 pt-8 mb-12 h-chatScreenHeight">
            {messages?.map(value => {
              if (value.sender !== userId) {
                return (
                  <div
                    className="my-4"
                    key={value.id || Date.now().toString(10)}
                  >
                    <div className="hidden">
                      <img src="" alt="" />
                    </div>
                    <div className="flex">
                      <span className="max-[940px]:text-base text-sm p-2 shadow-md bg-ivory-100">
                        {value.content}
                      </span>
                    </div>
                  </div>
                );
              }
              return (
                <div className="flex justify-end" key={value.id}>
                  <span className="max-[940px]:text-base text-sm w-max bg-myChat shadow-md my-6  p-2">
                    {value.content}
                  </span>
                </div>
              );
            })}
          </div>
          <SendMessage
            setMessages={setMessages}
            conversationId={conversationId}
            correspondance={correspondance}
            userId={userId}
            socket={socket}
            className="absolute"
          />
        </>
      ) : (
        <div>start conversation</div>
      )}
    </div>
  );
};

export default Conversations;
