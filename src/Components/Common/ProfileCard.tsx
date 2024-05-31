import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Blog, Who } from "../../Interfaces/Interfaces";
import "./Css/Wallet.css";
import { User } from "../../Interfaces/Interfaces";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import HostAPIs from "../../APIs/HostAPIs";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedBlog from "../Traveler/SelectedBlog";
import { format } from "timeago.js";
import Package from "../../Interfaces/common/Package";
import CreateBlog from "../Traveler/CreateBlog";
import ButtonCreateBlog from "../Traveler/ButtonCreateBlog";
import BookedPackages from "../Traveler/BookedPackages";
import Schedules from "../Host/Schedules";
import Pagination from "./Pagination";

interface ProfileCardProps {
  who: Who;
}

interface UserData {
  traveler?: {
    traveler: User;
  };
}
//----TO TIME FORMAT---
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} at ${formattedTime}`;
};

export default function ProfileCard({ who }: ProfileCardProps) {
  const navigate = useNavigate();
  const traveler = useSelector((state: UserData) => state.traveler);
  //--TO DESIGN WHEN TOGGLE ACTIVE
  const toggleDesign =
    who === Who.Host
      ? "bg-[#f2ceb3] rounded-full w-full h-8 text-lg font-semibold text-[#C63D2F]"
      : "bg-[#D9D9D9] rounded-full w-full h-8 text-lg font-semibold text-[#092635]";
  //--TO DESIGN WALLET CARD FOR BOTH
  const gradientColors =
    who === Who.Traveler
      ? "linear-gradient(to right, #26404E, #092635)"
      : "linear-gradient(to right, #FF9B50, #C63D2F)";

  //--TO STRORE USER DETAILS
  const [user, setUser] = useState<User>();
  //--HANDLE THE PROFILE EDIT INPUT
  const [isEdit, setIsEdit] = useState(false);
  //--TO HANDLE PASS EDIT INPUT
  const [passEdit, setPassEdit] = useState(false);
  //--TO HANDLE CREATE PASS INPUT
  const [createPass, setCreatePass] = useState(false);
  //--TO STORE USER DETAILS FOR HANDLING
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  //--TO HANDLE PASSWORD FOR UPDATION
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  //--TO HANDLE AVATR CLICK
  const fileInputRef = useRef<HTMLInputElement>(null);
  //--TO HANDLE TOGGLE ACTIVE
  const [selected, setSelected] = useState("wallet");
  //--HANDLE RE-RENDERING AFTER UPDATION
  const [update, setUpdate] = useState(false);
  //--TO HANDLE BLOGS
  const [blogs, setBlogs] = useState([]);
  const [blogModal, setBlogModal] = useState(false);
  const [blogId, setBlogId] = useState("");
  //--TO STORE HOST PACKAGES
  const [packages, setPackages] = useState([]);
  //--
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //--
  const [blogCreateModal, setBlogCreateModal] = useState(false);
  const closeBlogCreateModal = () => {
    setBlogCreateModal(false);
  };
  //--
  const [confirmModal, setConfirmModal] = useState(false);

  //-----------------------------------------HANDLE PROFILE DETAILS--------------------------------------------------
  useEffect(() => {
    async function fetchDetails() {
      if (who === "host") {
        const response = await HostAPIs.host_profile();
        setUser(response?.data);
        setName(response?.data.name);
        setEmail(response?.data.email);
      } else {
        const response = await TravelerAPIs.traveler_profile();
        setUser(response?.data);
        setName(response?.data.name);
        setEmail(response?.data.email);
      }
    }
    fetchDetails();
  }, [isEdit, passEdit, createPass, !update]);

  //-----TO OPEN FILE FOR UPLOAD DP----
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //------TO CHANGE OR UPLOAD DP-----------------------

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        handleDpUpdate(reader.result as string);
      };
    }
  };

  async function handleDpUpdate(image: string) {
    try {
      if (who === Who.Host) {
        const response = await HostAPIs.dp_update(image);
        if (response?.data.status) {
          toast.success(response.data.message);
          setUpdate(!update);
        } else {
          toast.error(response?.data.message);
        }
      } else {
        const response = await TravelerAPIs.dp_update(image);
        if (response?.data.status) {
          toast.success(response?.data.message);
          setUpdate(!update);
        } else {
          toast.error(response?.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //-----PROFILE DETAILS UPDATE------------------

  async function handleUpdate() {
    try {
      if (name.trim() === "") {
        toast.warning("Name is required");
      } else if (email.trim() === "") {
        toast.warning("Email is required");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.warning("Please enter valid Email Address");
      } else {
        if (who === Who.Host) {
          const response = await HostAPIs.host_profile_update({
            name: name,
            email: email,
          });
          if (response?.data.status) {
            toast.success(response.data.message);
            setIsEdit(false);
          } else {
            toast.error(response?.data.message);
          }
        } else {
          const response = await TravelerAPIs.profile_update({
            name: name,
            email: email,
          });
          if (response?.data.status) {
            toast.success(response.data.message);
            setIsEdit(false);
          } else {
            toast.error(response?.data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  //----CREATE NEW PASS IF USER DON'T HAVE PASSWORD-----IF USER LOGIN THROUGH GOOGLE---

  async function handleCreatePass() {
    try {
      if (newPass.trim() === "") {
        toast.warning("Password is required");
      } else if (newPass.length < 8) {
        toast.warning("Password must be 8 characters long");
      } else if (!/[0-9]/.test(newPass)) {
        toast.warning("Password requires a number");
      } else if (!/[a-z]/.test(newPass)) {
        toast.warning("Password requires a lowercase letter");
      } else if (!/[A-Z]/.test(newPass)) {
        toast.warning("Password requires an uppercase letter");
      } else if (!/[^\w]/.test(newPass)) {
        toast.warning("Password requires a symbol");
      } else {
        if (who === Who.Host) {
          const response = await HostAPIs.create_password(newPass);
          if (response?.data.status) {
            toast.success(response.data.message);
            setCreatePass(false);
          } else {
            toast.error(response?.data.message);
          }
        } else {
          const response = await TravelerAPIs.create_password(newPass);
          if (response?.data.status) {
            toast.success(response?.data.message);
            setCreatePass(false);
          } else {
            toast.error(response?.data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //-----TO UPDATE PASSWORD----------------------

  async function handlePassUpdate() {
    try {
      if (newPass.trim() === "" || currPass.trim() === "") {
        toast.warning("Password is required");
      } else if (newPass.length < 8) {
        toast.warning("Password must be 8 characters long");
      } else if (!/[0-9]/.test(newPass)) {
        toast.warning("Password requires a number");
      } else if (!/[a-z]/.test(newPass)) {
        toast.warning("Password requires a lowercase letter");
      } else if (!/[A-Z]/.test(newPass)) {
        toast.warning("Password requires an uppercase letter");
      } else if (!/[^\w]/.test(newPass)) {
        toast.warning("Password requires a symbol");
      } else {
        if (who === Who.Host) {
          const response = await HostAPIs.host_change_password({
            newPass: newPass,
            currPass: currPass,
          });
          if (response?.data.status) {
            toast.success(response.data.message);
            setPassEdit(false);
          } else {
            toast.error(response?.data.message);
          }
        } else {
          const response = await TravelerAPIs.change_password({
            newPass: newPass,
            currPass: currPass,
          });
          if (response?.data.status) {
            toast.success(response.data.message);
            setPassEdit(false);
          } else {
            toast.error(response?.data.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  //----SORT WALLETHISTORY DESCENDING ORDER

  const sortedWalletHistory = user?.walletHistory?.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  //--------------------------------------------------BLOGS HANDLING FOR TRAVELER----------------------------------------

  async function fetchBlogs() {
    try {
      const response = await TravelerAPIs.blogs_by_user();
      if (response?.data.status) {
        const processedBlogs = response.data.blogs.map((blog: Blog) => {
          const liked = blog?.liked_users?.includes(
            traveler?.traveler._id as string
          );
          return { ...blog, liked };
        });
        setBlogs(processedBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function like_unlike(blogId: string) {
    try {
      const response = await TravelerAPIs.like_unlike_blog(blogId);
      if (response?.data.status) {
        toast.success(response.data.message);
        fetchBlogs();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const closeModal = () => {
    setBlogModal(false);
    setUpdate(!update);
  };

  async function handleCancellation() {
    try {
      const response = await TravelerAPIs.remove_blog(blogId);
      if (response?.data.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response?.data.message);
      }
      fetchBlogs();
      setConfirmModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  //--------------------------------------------------BOOKING HANDLING FOR TRAVELER----------------------------------------

  async function fetchPackages() {
    try {
      const response = await HostAPIs.package_list(currentPage);
      if (response?.data.packageList) {
        setPackages(response.data.packageList.packages);
        setTotalPages(response.data.packageList.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-[#F2F2F2] p-10 min-h-screen">
        <div
          className={`${
            who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
          } h-full p-16 flex flex-col md:flex-row md:justify-evenly items-center rounded-t`}
        >
          <div className="avatar w-1/2 md:w-1/5 flex min-w-56 min-h-56 justify-center md:justify-start">
            <div
              className={`w-56 h-56 rounded-full ring-8 ${
                who === "host" ? "ring-[#c87369]" : "ring-[#092635]"
              } cursor-pointer`}
              onClick={handleAvatarClick}
            >
              {user?.image === "" ? (
                <img
                  className="w-56 h-56 rounded-full"
                  src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
                  alt="Profile"
                />
              ) : (
                <img
                  className="w-56 h-56 rounded-full"
                  src={`https://res.cloudinary.com/doac4pi2c/image/upload/${user?.image}`}
                  alt="Profile"
                />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div
            className={`w-full md:w-4/5 ${
              who === "host" ? "text-[#C63D2F]" : "text-[#092635]"
            }  h-56 mt-8 md:mt-0 flex flex-col pt-4  md:items-start md:pl-10`}
          >
            <div className="flex justify-between w-full">
              <div>
                <h1 className="text-3xl font-semibold">Login Details</h1>
              </div>
              <div>
                <button
                  onClick={() => (isEdit ? handleUpdate() : setIsEdit(true))}
                  className={`btn bg-transparent text-lg ${
                    who === "host"
                      ? "border-[#C63D2F] text-[#C63D2F] hover:bg-[#C63D2F] hover:text-[#FFBB5C]"
                      : "border-[#092635] text-[#092635] hover:bg-[#092635] hover:text-[#9EC8B9]"
                  } hover:border-none`}
                >
                  {isEdit ? (
                    <>
                      Save
                      <i className="fa-solid fa-rotate-right text-lg" />
                    </>
                  ) : (
                    <>
                      Edit
                      <i className="fa-solid fa-pen-to-square text-lg" />
                    </>
                  )}
                </button>
              </div>
            </div>
            <br />
            <div className="flex justify-between w-full">
              <div>
                <h1>Full Name : </h1>
              </div>
              <div>
                {isEdit ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    className={`input input-bordered ${
                      who === "host" ? "border-[#C63D2F]" : "border-[#092635]"
                    }  bg-transparent input-sm w-64 max-w-xs`}
                  />
                ) : (
                  <h1 className="font-bold">{name}</h1>
                )}
              </div>
            </div>
            <br />
            <div className="flex justify-between w-full">
              <div>
                <h1>Email :</h1>
              </div>
              <div>
                {isEdit ? (
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    className={`input input-bordered ${
                      who === "host" ? "border-[#C63D2F]" : "border-[#092635]"
                    }  bg-transparent input-sm w-64 max-w-xs`}
                  />
                ) : (
                  <h1 className="font-bold">{email}</h1>
                )}
              </div>
            </div>
            <br />
            <div className="flex justify-end w-full font-bold hover:text-blue-600 cursor-pointer">
              {user?.password ? (
                passEdit ? (
                  <>
                    <input
                      type="password"
                      value={currPass}
                      onChange={(e) => setCurrPass(e.target.value)}
                      name="curr_pass"
                      placeholder="Current Password"
                      className={`input input-bordered ${
                        who === "host" ? "border-[#C63D2F]" : "border-[#092635]"
                      }  bg-transparent input-sm w-64 max-w-xs mr-4`}
                    />

                    <input
                      type="password"
                      name="new_pass"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="New Password"
                      className={`input input-bordered ${
                        who === "host" ? "border-[#C63D2F]" : "border-[#092635]"
                      }  bg-transparent input-sm w-64 max-w-xs mr-4`}
                    />
                    <button
                      onClick={handlePassUpdate}
                      className={`btn bg-transparent btn-sm ${
                        who === "host"
                          ? "border-[#C63D2F] text-[#C63D2F] hover:bg-[#C63D2F] hover:text-[#FFBB5C]"
                          : "border-[#092635] text-[#092635] hover:bg-[#092635] hover:text-[#9EC8B9]"
                      } hover:border-none`}
                    >
                      <i className="fa-solid fa-rotate-right text-sm mr-4" />
                    </button>
                  </>
                ) : (
                  <h1 onClick={() => setPassEdit(true)}>Change Password ?</h1>
                )
              ) : createPass ? (
                <>
                  <input
                    type="password"
                    name="new_pass"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="New Password"
                    className={`input input-bordered ${
                      who === "host" ? "border-[#C63D2F]" : "border-[#092635]"
                    }  bg-transparent input-sm w-64 max-w-xs mr-4`}
                  />
                  <button
                    onClick={handleCreatePass}
                    className={`btn bg-transparent btn-sm ${
                      who === "host"
                        ? "border-[#C63D2F] text-[#C63D2F] hover:bg-[#C63D2F] hover:text-[#FFBB5C]"
                        : "border-[#092635] text-[#092635] hover:bg-[#092635] hover:text-[#9EC8B9]"
                    } hover:border-none`}
                  >
                    <i className="fa-solid fa-rotate-right text-sm mr-4" />
                  </button>
                </>
              ) : (
                <h1 onClick={() => setCreatePass(true)}>Create Password.</h1>
              )}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------TOGGLE BUTTON-------------------------------------------------------- */}

        <div
          className={`flex items-center justify-center ${
            who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
          }`}
        >
          <div
            className={`input input-wallet ${
              who === Who.Host ? "bg-[#E25E3E]" : "bg-[#5C8374]"
            } rounded-full justify-around`}
          >
            <button
              onClick={() => {
                setSelected("bookings");
                if (who === Who.Host) {
                  fetchPackages();
                }
              }}
              className={`${
                selected === "bookings"
                  ? toggleDesign
                  : "rounded-full w-full h-8 text-lg text-[#f2f2f2]"
              } `}
            >
              <i className="fa-solid fa-plane text-xl pt-1 pr-1" />
              {`${who === Who.Host ? "Schedules" : "My Trips"} `}
            </button>
            <button
              onClick={() => setSelected("wallet")}
              className={`${
                selected === "wallet"
                  ? toggleDesign
                  : "rounded-full w-full h-8 text-lg text-[#f2f2f2]"
              } `}
            >
              <i className="fa-solid fa-wallet text-xl pt-1 pr-2" />
              Wallet
            </button>
            <button
              onClick={() => {
                setSelected("blogs");
                if (who === Who.Traveler) {
                  fetchBlogs();
                } else {
                  fetchPackages();
                }
              }}
              className={`${
                selected === "blogs"
                  ? toggleDesign
                  : "rounded-full w-full h-8 text-lg text-[#f2f2f2]"
              } `}
            >
              <i className="fa-regular fa-images text-xl pt-1 pr-1" />
              {`${who === Who.Host ? "My Packages" : "My Blogs"}`}
            </button>
          </div>
        </div>

        {/* --------------------------------MYTRIPS - TRAVELER  |  SCHEDULES - HOST---------------------------------------------- */}

        {selected === "bookings" && (
          <div
            className={`${
              who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
            } h-full pt-10 pb-16 flex flex-col md:flex-row md:justify-evenly items-center rounded-b`}
          >
            {who === Who.Host ? (
              <>
                <Schedules />
              </>
            ) : (
              <>
                <BookedPackages />
              </>
            )}
          </div>
        )}
        {/* ------------------------------------------------WALLET CARD AND HISTORY--------------------------------------------------------- */}
        {selected === "wallet" && (
          <>
            <div
              className={`${
                who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
              } h-full pt-10 pb-16 flex flex-col md:flex-row md:justify-evenly items-center rounded-b`}
            >
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div
                    className="flip-card-front"
                    style={{ backgroundImage: gradientColors }}
                  >
                    <p className="heading_8264">
                      {who === "host" ? "MYBIZ WALLET" : "XTRIP WALLET"}
                    </p>
                    <svg
                      className="logo"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="56"
                      height="56"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#ff9800"
                        d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                      ></path>
                      <path
                        fill="#d50000"
                        d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                      ></path>
                      <path
                        fill="#ff3d00"
                        d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                      ></path>
                    </svg>
                    <svg
                      version="1.1"
                      className="chip"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50px"
                      height="50px"
                      viewBox="0 0 50 50"
                    >
                      {" "}
                      <image
                        id="image0"
                        width="50"
                        height="50"
                        x="0"
                        y="0"
                        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
          AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOY
          fEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSW
          ekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GS
          e0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOW
          ekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bf
          u3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWua
          fUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1
          lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrb
          tnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOh
          g0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU
          /f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dE
          orDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2Ng
          GAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVg
          OkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3d
          I2DcuDBZsBY5eVTr4xMSYcyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6a
          lKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkI
          JVU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0F
          qBoKWpqwRCVSgilOaY2OaUPw29qjOzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM
          1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGm
          BSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCET
          amiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdC
          S24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpj
          cmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
          MjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAy
          LTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="
                      />
                    </svg>

                    <p className="number">₹ {user?.wallet}.00</p>
                    <p className="valid_thru">VALID THRU</p>
                    <p className="date_8264">1 2 / 2 8</p>
                    <p className="name">{user?.name}</p>
                  </div>
                  <div
                    className="flip-card-back"
                    style={{ backgroundImage: gradientColors }}
                  >
                    <div className="strip"></div>
                    <div className="mstrip"></div>
                    <div className="sstrip">
                      <p className="code">***</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
              } h-full pt-10 pb-16 flex flex-col md:flex-row md:justify-evenly items-center rounded-b`}
            >
              {user?.walletHistory && (
                <div className=" px-4 ">
                  <div className="mx-auto p-6 pb-1 border bg-white rounded-md shadow-dashboard">
                    <div className="flex flex-wrap items-center justify-between mb-1 -m-2">
                      <div className="w-auto p-2">
                        <h2 className="text-lg font-semibold text-coolGray-900">
                          Transactions History
                        </h2>
                        <p className="text-xs text-coolGray-500 font-medium">
                          All transactions
                        </p>
                      </div>
                      <div className="w-auto p-2">
                        <a
                          href="#"
                          className="text-sm text-green-500 hover:text-green-600 font-semibold"
                        >
                          See all
                        </a>
                      </div>
                    </div>
                    <div
                      className="flex flex-wrap"
                      style={{
                        maxHeight: "15rem",
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {!sortedWalletHistory?.length && (
                        <p className="p-16">No Transactions</p>
                      )}
                      {sortedWalletHistory?.map((data, index: number) => (
                        <div
                          key={index}
                          className="w-full border-b border-coolGray-100"
                        >
                          <div className="flex flex-wrap items-center justify-between py-4 -m-2">
                            <div className="w-auto p-2">
                              <div className="flex flex-wrap items-center -m-2">
                                <div className="w-auto p-2">
                                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-50 rounded-md">
                                    {data.status === "Credited" && (
                                      <i className="fa-solid fa-arrow-down-long text-green-600" />
                                    )}
                                    {data.status === "Debited" && (
                                      <i className="fa-solid fa-arrow-up-long text-red-600" />
                                    )}
                                    {data.status === "Cancelled" && (
                                      <i className="fa-solid fa-arrow-down-long text-green-600" />
                                    )}
                                    {data.status === "Booked" && (
                                      <i className="fa-solid fa-arrow-up-long text-red-600" />
                                    )}
                                  </div>
                                </div>
                                <div className="w-auto p-2">
                                  <h2 className="text-sm font-medium text-coolGray-900">
                                    {data.status === "Credited" &&
                                      `${data.travelerName} Paid ${data.amount}`}

                                    {data.status === "Debited" &&
                                      `${data.travelerName} Cancelled ${data.packageName}`}

                                    {data.status === "Cancelled" &&
                                      ` Cancelled ${data.packageName}`}

                                    {data.status === "Booked" &&
                                      ` Booked ${data.packageName}`}
                                  </h2>
                                  <h2 className="text-sm font-medium text-coolGray-900">
                                    {data.status === "Credited" &&
                                      `${data.packageName}`}
                                    {data.status === "Debited" &&
                                      ` ${data.amount} Debited from wallet`}
                                    {data.status === "Cancelled" &&
                                      `${data.amount} Credited to wallet`}
                                    {data.status === "Booked" &&
                                      `${data.amount} Debited from wallet`}
                                  </h2>
                                </div>
                              </div>
                            </div>
                            <div className="w-auto p-2">
                              <p
                                className={`text-xs text-${
                                  data.status === ("Credited" || "Booked")
                                    ? "green-600"
                                    : "red-600"
                                } font-medium`}
                              >
                                {data.status === "Credited" && `Credit`}
                                {data.status === "Debited" && "Debit"}
                                {data.status === "Cancelled" && `Cancelled`}
                                {data.status === "Booked" && "Booked"}
                              </p>
                              <p className="text-xs text-coolGray-500 font-medium">
                                {formatDateTime(data.date)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* -----------------------------------MY BLOGS - TRAVELER  |  MY PACKAGES - HOST ------------------------------------------------------ */}
        {selected === "blogs" && (
          <>
            {who === Who.Traveler && (
              <div className="flex justify-center pt-10 bg-[#D9D9D9]">
                <ButtonCreateBlog setCreateModal={setBlogCreateModal} />
              </div>
            )}
            {who === Who.Host && (
              <div className="flex justify-center pt-10 bg-[#f2ceb3]">
                <button
                  onClick={() => navigate("/host/create_package")}
                  className="btn btn-wide bg-[#C63D2F] border-none text-[#FFBB5C] hover:bg-[#FFBB5C] hover:text-[#C63D2F] text-xl"
                >
                  Create Package
                </button>
              </div>
            )}
            <div
              className={`${
                who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
              } h-full pt-10 pb-16 flex flex-col md:flex-row md:justify-evenly items-center rounded-b`}
            >
              {who === Who.Host ? (
                <>
                  <div className="flex flex-wrap items-center justify-evenly gap-5 py-10 px-12 ">
                    {packages.map((data: Package, index) => (
                      <div className="card-wrapper mb-4 text-end" key={index}>
                        <div
                          className={`card  glass w-96  ${
                            who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
                          }  `}
                        >
                          <figure className="w-full h-52">
                            <img
                              className=""
                              key={index}
                              src={`https://res.cloudinary.com/doac4pi2c/image/upload/${data?.images?.[0]}`}
                              alt="car!"
                            />
                          </figure>
                          <div
                            className="card-body"
                            key={index}
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                          >
                            <h2
                              onClick={() =>
                                navigate(`/host/package_details/${data._id}`)
                              }
                              className="card-title text-black"
                            >
                              {data.name}
                            </h2>
                            <p className="text-black">{data.destination}</p>
                            <p className="text-black">
                              {formatDate(data.dur_start)} to{" "}
                              {formatDate(data.dur_end)}
                            </p>
                            <p className="text-black">{data.itinerary}</p>
                            <p className="text-black font-bold text-end">
                              {" "}
                              ₹ {data.price}
                            </p>
                            <div className="card-actions items-center"></div>
                            {who === "host" ? (
                              <button
                                onClick={() =>
                                  navigate(`/host/edit_package/${data._id}`)
                                }
                                className="btn bg-[#C63D2F] border-none text-[#FFBB5C] hover:bg-[#FFBB5C] hover:text-[#C63D2F]"
                              >
                                Edit Package
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                    
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-evenly gap-5 py-10 px-12 ">
                    {blogCreateModal && (
                      <CreateBlog onClose={closeBlogCreateModal} />
                    )}
                    {confirmModal && (
                      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
                          <div className="">
                            <div className="text-center p-3 flex-auto justify-center">
                              <svg
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  clip-rule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  fill-rule="evenodd"
                                ></path>
                              </svg>
                              <h2 className="text-xl font-bold py-4 text-gray-200">
                                Are you sure?
                              </h2>
                              <p className="font-bold text-sm text-gray-500 px-2">
                                Do you really want to continue ? This process
                                cannot be undone
                              </p>
                            </div>
                            <div className="p-2 mt-2 text-center space-x-1 md:block">
                              <button
                                onClick={() => setConfirmModal(false)}
                                className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleCancellation()}
                                className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!blogs.length && <p className="p-16 ">No Blogs</p>}
                    {blogs &&
                      blogs?.map((blog: Blog, index: number) => (
                        <div key={index} className="post-card">
                          {blogModal && (
                            <SelectedBlog
                              onClose={closeModal}
                              blogId={blogId}
                            />
                          )}
                          <div className="flex justify-between">
                            <img
                              className="avatar"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OnF25iXucIOQkieN9v75o5TCNmr7X75d_LowE9dUX4bVnGaFQ2F6KI7p&s=10"
                              alt=""
                            />
                            <p className="pl-3 pt-1">@{blog.userName}</p>

                            <i
                              onClick={() => {
                                setBlogId(blog._id as string);
                                setConfirmModal(true);
                              }}
                              className="fa-solid fa-trash text-xl pt-2"
                            ></i>
                          </div>

                          <a
                            onClick={() => {
                              setBlogModal(true);
                              setBlogId(blog._id as string);
                            }}
                            className="title"
                          >
                            {blog.caption}
                          </a>
                          <span className="datetime">
                            {format(blog?.time as Date)}
                          </span>
                          <div className="image-preview">
                            <img
                              className="rounded"
                              src={`https://res.cloudinary.com/doac4pi2c/image/upload/${blog?.image}`}
                              alt=""
                            />
                          </div>
                          <div className="comment-like">
                            <span>
                              {blog.liked ? (
                                <i
                                  onClick={() =>
                                    like_unlike(blog._id as string)
                                  }
                                  className="fa-solid fa-heart text-red-600 text-2xl"
                                />
                              ) : (
                                <i
                                  onClick={() =>
                                    like_unlike(blog._id as string)
                                  }
                                  className="fa-regular fa-heart text-2xl"
                                ></i>
                              )}
                              &nbsp;&nbsp;&nbsp;
                              {blog.liked_users?.length}
                            </span>
                            <span>
                              <i
                                className="fa-regular fa-comment text-2xl"
                                onClick={() => {
                                  setBlogModal(true);
                                  setBlogId(blog._id as string);
                                }}
                              />{" "}
                              &nbsp;&nbsp;&nbsp;
                              {blog.comments?.length}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
