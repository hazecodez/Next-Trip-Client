import NavLinks from "../Common/NavLinks";
import LogoutCard from "../Common/LogoutCard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TravelerLogout } from "../../Redux/Slices/Traveler";
import Cookies from "js-cookie";
import { toast } from "sonner";

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
    dispatch(TravelerLogout());
    Cookies.remove("travelerToken");
    toast.success("You have been logged out successfully.");
    navigate("/login");
  }

  return (
    <>
      <div className={`navbar bg-base-100 z-10`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavLinks color="[#9EC8B9]" name="Home" link="/" />
              <NavLinks color="[#9EC8B9]" name="Blogs" link="/blogs" />
              <NavLinks color="[#9EC8B9]" name="Stays" link="/stays" />
              <NavLinks color="[#9EC8B9]" name="Flights" link="/flights" />
              <NavLinks color="[#9EC8B9]" name="Packages" link="/packages" />
            </ul>
          </div>
          <img
            src="../Traveler/Logo.png"
            className="h-auto w-28"
            alt="Flowbite Logo"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLinks color="[#9EC8B9]" name="Home" link="/" />
            <NavLinks color="[#9EC8B9]" name="Blogs" link="/blogs" />
            <NavLinks color="[#9EC8B9]" name="Stays" link="/stays" />
            <NavLinks color="[#9EC8B9]" name="Flights" link="/flights" />
            <NavLinks color="[#9EC8B9]" name="Packages" link="/packages" />
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              <span className="badge badge-xs badge-primary indicator-item"></span>
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
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge bg-[#9EC8B9] text-base-100">New</span>
                </a>
              </li>
              <li>
                <a>Chats</a>
              </li>
              <li>
                <a onClick={logoutModal}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <LogoutCard action={logout} color="base-100" />
      </div>
    </>
  );
}
