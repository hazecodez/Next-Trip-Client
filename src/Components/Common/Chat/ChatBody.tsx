// import ChatHeader from "./ChatHeader";
// import ChatInput from "./ChatInput";
import ChatBar from "./ChatBar";
import { Who } from "../../../Interfaces/Interfaces";
import { useSelector } from "react-redux";
import { User } from "../../../Interfaces/Interfaces";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
// import HostAPIs from "../../../APIs/HostAPIs";
import { format } from "timeago.js";
import { MessageType } from "../../../Interfaces/Interfaces";
import TravelerAPIs from "../../../APIs/TravelerAPIs";

interface UserData {
  host?: {
    host: User;
  };
  traveler?: {
    traveler: User;
  };
}
type WhoseChat = {
  who: Who;
};

export default function ChatBody({ who }: WhoseChat) {
  const host = useSelector((state: UserData) => state.host);
  const traveler = useSelector((state: UserData) => state.traveler);
  const data = who === "traveler" ? traveler?.traveler : host?.host;

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversations, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState<MessageType | null>(
    null
  );

  const [conversationId, setConversationId] = useState(
    localStorage.getItem("conversationId")
  );
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [receiver, setReceiver] = useState("");
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<Socket | undefined>();

  useEffect(() => {
    socket.current = io("ws://localhost:5050");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date(),
        conversationId: data.conversationId,
      } as MessageType);
    });
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current?.emit("addUser", data?._id);
  }, []);
  useEffect(() => {
    const fetchConversations = async () => {
      const response = await TravelerAPIs.get_conversations(
        data?._id as string
      );
      setConversation(response?.data);
    };
    fetchConversations();
  }, []);
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  useEffect(() => {
    if (conversationId) {
      const chat = async (conversationId: string) => {
        setSelectedConversation(conversationId);
        const response = await TravelerAPIs.get_messages(conversationId);
        // const userName = await TravelerAPIs.user_name()
        setMessages(response?.data.data);
        setClicked(!clicked);
      };
      chat(conversationId);
    }
  });
  const handleClick = async (conversationId: string) => {
    localStorage.setItem("conversationId", conversationId);
    setConversationId(conversationId);
    setSelectedConversation(conversationId);
    const response = await TravelerAPIs.get_messages(conversationId);
    setMessages(response?.data.data);
    setClicked(!clicked);
  };
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (message.trim().length !== 0 && message[0] !== " ") {
        const response = await TravelerAPIs.new_message(
          message,
          conversationId as string,
          data?._id as string
        );
        socket.current?.emit("sendMessage", {
          senderId: data?._id,
          receiverId: receiver,
          text: message,
        });
        if (response?.data) {
          setMessages([...messages, response.data as MessageType]);
          setMessage("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`flex justify-between
       bg-[#F2F2F2]`}
      >
        {/* {who === "traveler" ? (
          <ChatBar
            who={Who.Traveler}
            handleClick={handleClick}
            setClicked={setClicked}
            setReceiver={setReceiver}
            setUser={setUser}
          />
        ) : (
          <ChatBar
            who={Who.Host}
            handleClick={handleClick}
            setClicked={setClicked}
            setReceiver={setReceiver}
            setUser={setUser}
            
          />
        )} */}
        <div
          className={`w-80 m-5 rounded-md ${
            who === "traveler" ? "bg-blue-100" : "bg-[#fae9dc]"
          } shadow-2xl `}
        >
          <div
            className={`w-full rounded-t-md  ${
              who === "traveler" ? "bg-[#092635] " : "bg-[#C63D2F] text-white"
            } h-14 shadow-2xl items-center flex justify-center`}
          >
            <h1 className="font-bold text-xl">C h a t s</h1>
          </div>
          {who === "traveler" ? (
            <>
              {conversations &&
                conversations.map((conversation, index) => (
                  <div key={index}>
                    <ChatBar
                      who={Who.Traveler}
                      handleClick={handleClick}
                      setClicked={setClicked}
                      setReceiver={setReceiver}
                      setUser={setUser}
                      conversation={conversation}
                    />
                  </div>
                ))}
            </>
          ) : (
            <>
              {conversations &&
                conversations.map((conversation, index) => (
                  <div key={index}>
                    <ChatBar
                      who={Who.Host}
                      handleClick={handleClick}
                      setClicked={setClicked}
                      setReceiver={setReceiver}
                      setUser={setUser}
                      conversation={conversation}
                    />
                  </div>
                ))}
            </>
          )}
        </div>

        <div
          className={`w-3/4 m-5 h-96 
         bg-${
           who === "traveler" ? "blue-100" : "[#fae9dc]"
         } rounded-t-md  rounded-b-3xl
          shadow-2xl
           `}
        >
          {selectedConversation && (
            <div
              className={`${
                who === "traveler" ? "bg-[#092635]" : "bg-[#C63D2F]"
              } shadow-2xl w-full h-16 rounded-t-md`}
            >
              <div className={`flex items-center pl-8 pt-2 gap-4 rounded-full`}>
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt=""
                />
                <div className="font-semibold text-white">
                  <div>{user}</div>
                  <div className="text-sm text-gray-400">
                    {/* Joined in August 2014 */}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-y-auto max-h-80 ">
            {messages &&
              messages.map((message, index) => (
                <div key={index}>
                  {message.senderId === data?._id ? (
                    <div
                      className={`chat chat-end m-4`}
                      key={index}
                      ref={index === messages.length - 1 ? scrollRef : null}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          />
                        </div>
                      </div>

                      <div
                        className={`chat-bubble ${
                          who === "host" ? "bg-[#E25E3E] text-white" : ""
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="chat-footer opacity-50 text-black">
                        Delivered
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`chat chat-start m-4`}
                      key={index}
                      ref={index === messages.length - 1 ? scrollRef : null}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          />
                        </div>
                      </div>

                      <div
                        className={`chat-bubble ${
                          who === "host" ? "bg-[#E25E3E] text-white" : ""
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="chat-footer opacity-50 text-black">
                        {format(message.createdAt)}{" "}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-end">
        {/* <button
            type="button"
            className={`p-2 rounded-full cursor-pointer
            ${who === "traveler" ? "hover:bg-[#133e54]" : "hover:bg-[#E25E3E]"}
           text-blue-100 `}
          >
            <i className="fa-solid fa-face-kiss-wink-heart text-2xl " />
            <span className="sr-only">Add emoji</span>
          </button> */}
        <form
          onSubmit={sendMessage}
          className={`flex w-3/4 items-center mr-5 mb-5  px-3 py-2 
          rounded-full ${who === "traveler" ? "bg-[#092635]" : "bg-[#C63D2F]"}`}
        >
          <input
            type="text"
            placeholder="Send message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`flex w-full ${
              who === "traveler" ? "bg-[#133e54]" : "bg-[#E25E3E] text-white"
            } 

          rounded-full focus:outline-none
           focus:border-indigo-300 pl-10 h-10`}
          />
          <button
            type="submit"
            className={`inline-flex justify-center p-2
           rounded-full cursor-pointer
           ${who === "traveler" ? "hover:bg-[#133e54]" : "hover:bg-[#E25E3E]"}
           text-blue-100`}
          >
            <i className="fa-solid fa-paper-plane text-2xl" />
          </button>
        </form>
      </div>
    </>
  );
}
