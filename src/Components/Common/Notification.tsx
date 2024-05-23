import { Who } from "../../Interfaces/Interfaces";
import "./Css/Notification.css";

interface NotificationProps {
  who: Who;
  toggleNotification: () => void;
}

export default function Notification({
  who,
  toggleNotification,
}: NotificationProps) {
  return (
    <>
      <div className="notification-box">
        <p>Your notifications</p>
        rejhglerhgkjfdkh
      </div>
      <div className="overlay" onClick={toggleNotification}></div>
    </>
  );
}
