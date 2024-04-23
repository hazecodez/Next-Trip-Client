import { useDispatch } from "react-redux";
import LogoutCard from "../Common/LogoutCard";
import NavLinks from "../Common/NavLinks";
import { adminLogout } from "../../Redux/Slices/Admin";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
    dispatch(adminLogout());
    Cookies.remove("adminToken");
    toast.success("You have been logged out successfully.");
    navigate("/admin/login");
  }
  return (
    <>
      <div className="navbar bg-[#24263A] glass relative z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
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
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                  </div>
                </label>
              </div>
              <div className="drawer-side flex flex-col h-screen">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-8 w-80 min-h-full bg-[#24263A] text-2xl font-mono font-bold text-base-content">
                  <NavLinks color="[#DBDFEA" link="/admin/" name="Dashboard" />
                  <NavLinks
                    color="[#DBDFEA"
                    link="/admin/travelers"
                    name="Travelers"
                  />
                  <NavLinks
                    color="[#DBDFEA"
                    name="Travel Hosts"
                    link="/admin/hosts"
                  />
                  <NavLinks
                    color="[#DBDFEA"
                    link="/admin/packages"
                    name="Packages"
                  />
                  <NavLinks color="[#DBDFEA" link="/admin/blogs" name="Blogs" />
                  <li onClick={logoutModal} className="mt-auto">
                    <NavLinks color="[#DBDFEA" link="" name="Logout" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Next Trip</a>
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
        </div>
      </div>
      <LogoutCard color="[#24263A]" action={logout} />
    </>
  );
}
