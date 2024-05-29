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
  notification: MessageType[]
  setNotification: Dispatch<SetStateAction<MessageType[]>>;
}

const initialContextValue: AuthContextValue = {
  notification: [],
  setNotification: () => [],
};

export const AuthContext = createContext<AuthContextValue>(initialContextValue);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<MessageType[]>([]);

  const contextValue = {
    notification,
    setNotification,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
