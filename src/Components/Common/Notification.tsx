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
            {notification.map((data, index) => (
              
              <div
                key={index}
                onClick={() => {
                  setNotification([]);
                  if (who === Who.Host) {
                    navigate("/host/chat");
                  } else {
                    navigate("/chat");
                  }
                }}
                role="alert"
                className={`alert shadow-lg mt-5 bg-gray-200 ${who === Who.Host ? "border-[#C63D2F]" : "border-[#092635]"}`}
              >
                <i className="fa-solid fa-user" />
                <div>
                  <h3 className="font-bold text-xs">{data.senderName}</h3>
                  <div className="text-xs">Sends {data.text}</div>
                </div>
                
              </div>
            ))}
          </>
        )}
      </div>
      <div className="overlay" onClick={toggleNotification}></div>
    </>
  );
}
