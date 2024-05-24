import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { MessageType } from "../Interfaces/Interfaces";

// Define the notification type

interface AuthContextValue {
  notification: MessageType[] | null;
  setNotification: Dispatch<SetStateAction<MessageType[] | null>>;
  videoCall: string | null;
  setVideoCall: Dispatch<SetStateAction<string | null>>;
}

const initialContextValue: AuthContextValue = {
  notification: null,
  setNotification: () => null,
  videoCall: null,
  setVideoCall: () => null,
};

export const AuthContext = createContext<AuthContextValue>(initialContextValue);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<MessageType[] | null>(null);
  const [videoCall, setVideoCall] = useState("");

  const contextValue = {
    notification,
    setNotification,
    videoCall,
    setVideoCall,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
