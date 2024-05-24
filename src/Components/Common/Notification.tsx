import { useContext } from "react";
import { Who } from "../../Interfaces/Interfaces";
import "./Css/Notification.css";
import { AuthContext } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

interface NotificationProps {
  who: Who;
  toggleNotification: () => void;
}

export default function Notification({
  who,
  toggleNotification,
}: NotificationProps) {
  const { notification, setNotification } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="notification-box">
        <p className="font-bold">Notifications</p>
        <hr />
        {!notification && <p>No New Messages</p>}
        {notification && (
          <>
            <div
              onClick={() => {
                setNotification([]);
                if (who === Who.Host) {
                  navigate("/host/chat");
                } else {
                  navigate("/chat");
                }
              }}
              className="w-full bg-gray-200 h-10 mt-5 rounded-lg p-2 pl-8"
            >
              New Message from {who === Who.Host ? "Traveler" : "Host"}
            </div>
          </>
        )}
      </div>
      <div className="overlay" onClick={toggleNotification}></div>
    </>
  );
}
