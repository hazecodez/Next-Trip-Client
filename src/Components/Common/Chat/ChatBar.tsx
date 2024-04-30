import { Who } from "../../../Interfaces/Interfaces";
import { useSelector } from "react-redux";
import { User } from "../../../Interfaces/Interfaces";
import { useEffect, useState } from "react";
import { Conversation } from "../../../Interfaces/Interfaces";
import TravelerAPIs from "../../../APIs/TravelerAPIs";

interface UserData {
  host?: {
    host: User;
  };
  traveler?: {
    traveler: User;
  };
}

type Props = {
  who: Who;
  conversation: Conversation;
  handleClick(conversationId: string): void;
  setReceiver(id: string): void;
  setClicked(value: boolean): void;
  setUser(name: string): void;
};

export default function ChatBar({
  who,
  conversation,
  handleClick,
  setReceiver,
  setClicked,
  setUser,
}: Props) {
  const host = useSelector((state: UserData) => state.host);
  const traveler = useSelector((state: UserData) => state.traveler);
  const data = who === "traveler" ? traveler?.traveler : host?.host;


  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await Promise.all(
        filteredMembers.map(async (mem) => {         
          const res = await TravelerAPIs.user_name(mem,who);
          return res?.data.data;
        })
      );
      setUsers(user as User[]);
      
    };
    const filteredMembers = conversation.members.filter(
      (mem) => mem !== data?._id
    );    
    fetchData();
  }, [conversation, data?._id]);

  const Conversation = (conversationId: string, userId: string) => {   
    setReceiver(userId);
    handleClick(conversationId);
  };

  return (
    <>
      <div className="overflow-y-auto max-h-80">
        {users.map((user, index) => (
          <div
            className={`flex items-center mt-1 gap-4  shadow m-3 rounded-full`}
            key={index}
            onClick={() => {
              Conversation(conversation._id, user._id as string);
              setClicked(true);
              setUser(user.name as string);
            }}
          >
            <img
              className="w-10 h-10 rounded-full"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt=""
            />
            <div className="font-semibold dark:text-black">
              <div>{user.name}</div>
              <div className="text-sm text-gray-800 dark:text-gray-400">
                Joined in August 2014
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
