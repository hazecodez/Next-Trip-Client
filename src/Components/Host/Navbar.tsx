import { useDispatch } from "react-redux";
import LogoutCard from "../Common/LogoutCard";
import NavLinks from "../Common/NavLinks";
import { useNavigate } from "react-router-dom";
import { hostLogout } from "../../Redux/Slices/Host";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { Who } from "../../Interfaces/Interfaces";
import Notification from "../Common/Notification";
import { AuthContext } from "../../Context/ContextProvider";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutModal = () => {
    const modal = document.getElementById(
      "my_modal_6"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  function logout() {
    dispatch(hostLogout());
    Cookies.remove("hostToken");
    Cookies.remove("host");
    toast.success("You have been logged out successfully.");
    navigate("/host/login");
  }

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const {notification } = useContext(AuthContext);
  return (
    <>
      <div className={`navbar bg-[#C63D2F] sticky top-0 z-20`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#FFBB5C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu  menu-lg font-bold dropdown-content mt-3 z-[1] p-2 shadow bg-[#C63D2F] rounded-box w-52"
            >
              <NavLinks color="[#FFBB5C]" name="Dashboard" link="/host/" />
              <NavLinks
                color="[#FFBB5C]"
                name="My Packages"
                link="/host/my_packages"
              />
              <NavLinks
                color="[#FFBB5C]"
                name="Schedules"
                link="/host/schedules"
              />
            </ul>
          </div>
          <img
            src="../Host/HostLogo.png"
            className="h-auto w-28"
            alt="Next-Trip Logo"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLinks color="[#FFBB5C]" name="Dashboard" link="/host/" />
            <NavLinks
              color="[#FFBB5C]"
              name="My Packages"
              link="/host/my_packages"
            />
            <NavLinks
              color="[#FFBB5C]"
              name="Schedules"
              link="/host/schedules"
            />
          </ul>
        </div>
        <div className="navbar-end">
          {/* <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#FFBB5C]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button> */}
          <button  onClick={toggleNotification} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#FFBB5C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {
                notification &&  <span className="badge badge-xs badge-warning indicator-item">{notification.length}</span>
              }
             
            </div>
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-7 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu font-bold menu-lg text-[#FFBB5C] dropdown-content mt-3 z-[1] p-2 shadow bg-[#C63D2F] rounded-box w-52"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => navigate("/host/profile")}
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    localStorage.removeItem("conversationId");
                    navigate("/host/chat");
                  }}
                >
                  Chats{" "}
                  <span className="badge bg-[#FFBB5C] border-none text-black">
                    New
                  </span>
                </a>
              </li>
              <li>
                <a onClick={logoutModal}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <LogoutCard color="[#C63D2F]" action={logout} />
      </div>
      {isNotificationOpen && (
        <Notification who={Who.Host} toggleNotification={toggleNotification} />
      )}
    </>
  );
}
