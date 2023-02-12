import { useRef } from "react";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { postAMessage } from "../../api";

const SendMessage = ({
  setMessages,
  conversationId,
  userId,
  socket,
  correspondance,
}) => {
  const inputRef = useRef(null);
  const HandleSubmit = e => {
    e.preventDefault();
    if (inputRef.current.value === "") {
      return;
    }
    const sendTheMessage = async () => {
      if (inputRef.current.value !== "") {
        const res = await postAMessage(conversationId, {
          sender: userId,
          content: inputRef.current.value,
        });
        setMessages(mes => [...mes, ...res.data]);
      }
    };
    sendTheMessage();
    socket.current?.emit("sendMessage", {
      message: inputRef.current.value,
      recever: correspondance,
      sender: userId,
    });
    inputRef.current.value = "";
  };
  return (
    <div className="flex items-center w-full absolute bottom-0 overflow-x-hidden bg-slate-50 p-2">
      <ImAttachment color="#265B8B" />
      <form className="w-full flex bg-slate-50" onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Type a message"
          className="w-full border-0 py-2 focus:outline-none bg-slate-50 px-2"
          ref={inputRef}
        />
        <button type="submit" className="inline-block w-12 ml-2">
          <MdSend color="#265B8B" />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
