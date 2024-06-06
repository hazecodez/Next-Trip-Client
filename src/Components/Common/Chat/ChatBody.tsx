import ChatBar from "./ChatBar";
import { CallDetails, Who } from "../../../Interfaces/Interfaces";
import { useSelector } from "react-redux";
import { User } from "../../../Interfaces/Interfaces";
import { io, Socket } from "socket.io-client";
import { useState, useEffect, useRef, useContext } from "react";
import { format } from "timeago.js";
import { MessageType } from "../../../Interfaces/Interfaces";
import TravelerAPIs from "../../../APIs/TravelerAPIs";
import { AuthContext } from "../../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
  const navigate = useNavigate();

  const { setNotification } = useContext(AuthContext);

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
  const [showModal, setShowModal] = useState(false);
  const [callDetails, setCallDetails] = useState<CallDetails>();
  const [roomNumber, setRoomNumber] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useRef<Socket | undefined>();

  useEffect(() => {
    // socket.current = io("ws://localhost:5050");
    socket.current = io("https://furnicube.shop");
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
    socket.current?.on("getNotification", (data) => {
      setNotification((prev) => [data, ...prev]);
    });
  }, [setNotification]);

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

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

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
  }, []);
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
          senderName: data?.name,
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

  const handleVideoCall = (receiverId: string) => {
    const randomNumber = uuidv4().slice(0, 5);
    if (socket.current) {
      socket.current.emit("videoCallInitiated", {
        userId: traveler?.traveler._id,
        username: traveler?.traveler.name,
        roomId: randomNumber,
        receiverId: receiverId,
      });
      navigate(`/video/${randomNumber}`);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("videoCallAccept", (data) => {
        setCallDetails({
          username: data.username,
          roomId: data.roomId,
        });
        console.log(data.roomId);
        setRoomNumber(data.roomId);

        setShowModal(true);
      });
    }
  }, [socket]);

  const acceptCall = async () => {
    navigate(`/host/video/${roomNumber}`);
    setShowModal(false);
  };

  return (
    <>
      <div
        className={`flex justify-between
       bg-[#F2F2F2]`}
      >
        {showModal && (
          <>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="w-[250px] flex flex-col p-4 relative items-center justify-center bg-[#C63D2F] border border-[#C63D2F] shadow-lg rounded-2xl">
                <div className="">
                  <div className="text-center p-3 flex-auto justify-center">
                    <i className="fa-solid fa-user text-5xl text-white" />
                    <h2 className="text-xl font-bold py-4 text-gray-200">
                      {callDetails?.username} Calling..
                    </h2>
                  </div>
                  <div className="p-2 mt-2 text-center space-x-1 md:block">
                    <button
                      onClick={() => setShowModal(false)}
                      className="mb-2 md:mb-0 bg-red-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-red-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-red-800 transition ease-in duration-300"
                    >
                      <i className="fa-solid fa-phone" />
                      &nbsp;Reject
                    </button>
                    <button
                      onClick={acceptCall}
                      className="bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
                    >
                      <i className="fa-solid fa-video" />
                      &nbsp; Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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
                  src="https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg"
                  alt=""
                />
                <div className="font-semibold w-full text-white flex justify-between">
                  <div>{user}</div>
                  {user && who === Who.Traveler && (
                    <>
                      <i
                        onClick={() => handleVideoCall(receiver)}
                        className="fa-solid fa-video pr-10 text-xl pt-3"
                      ></i>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <div ref={scrollRef} className="overflow-y-auto max-h-80 ">
            {messages &&
              messages.map((message, index) => (
                <div key={index}>
                  {message.senderId === data?._id ? (
                    <div
                      className={`chat chat-end m-4`}
                      key={index}
                      // ref={index === messages.length - 1 ? scrollRef : null}
                      ref={scrollRef}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg"
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
                      // ref={index === messages.length - 1 ? scrollRef : null}
                      ref={scrollRef}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
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
                        {format(message?.createdAt as Date)}{" "}
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
