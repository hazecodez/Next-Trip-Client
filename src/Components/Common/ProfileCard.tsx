import { useEffect, useState } from "react";
import { Who } from "../../Interfaces/Interfaces";
import "./Css/Wallet.css";
import { User } from "../../Interfaces/Interfaces";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import HostAPIs from "../../APIs/HostAPIs";
import { toast } from "sonner";

interface ProfileCardProps {
  who: Who;
}
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
  const gradientColors =
    who === "traveler"
      ? "linear-gradient(to right, #26404E, #092635)"
      : "linear-gradient(to right, #FF9B50, #C63D2F)";

  const [user, setUser] = useState<User>();
  const [isEdit, setIsEdit] = useState(false);
  const [passEdit, setPassEdit] = useState(false);
  const [createPass, setCreatePass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");

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
  }, [isEdit, passEdit, createPass]);

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

  return (
    <>
      <div className="bg-[#F2F2F2] p-10 min-h-screen">
        <div
          className={`${
            who === "host" ? "bg-[#f2ceb3]" : "bg-[#D9D9D9]"
          } h-full p-16 flex flex-col md:flex-row md:justify-evenly items-center rounded-t`}
        >
          <div className="avatar w-1/2 md:w-1/5 flex min-w-56  min-h-56 justify-center md:justify-start">
            <div
              className={`w-56 h-56 rounded-full ring-8 ${
                who === "host" ? "ring-[#c87369]" : "ring-[#092635]"
              } `}
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
            <button
              onClick={() => console.log("image")}
              className={`btn rounded-full w-12 bg-transparent ${
                who === "host"
                  ? "text-[#C63D2F]  hover:bg-[#C63D2F] hover:text-[#FFBB5C]"
                  : "text-[#092635] hover:bg-[#092635] hover:text-[#9EC8B9]"
              }  border-none `}
            >
              <i className="fa-solid fa-pen-to-square text-xl " />
            </button>
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
        <hr
          className={`${
            who === "host" ? "border-[#C63D2F]" : "border-[#092635]"
          } `}
        />
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
                <div className="flex flex-wrap">
                  {user.walletHistory.map((data, index: number) => (
                    <div
                      key={index}
                      className="w-full border-b border-coolGray-100"
                    >
                      <div className="flex flex-wrap items-center justify-between py-4 -m-2">
                        <div className="w-auto p-2">
                          <div className="flex flex-wrap items-center -m-2">
                            <div className="w-auto p-2">
                              <div className="flex items-center justify-center w-12 h-12 bg-yellow-50 rounded-md">
                                {data.status === "Credited" ? (
                                  <i className="fa-solid fa-arrow-down-long text-green-600" />
                                ) : (
                                  <i className="fa-solid fa-arrow-up-long text-red-600" />
                                )}
                              </div>
                            </div>
                            <div className="w-auto p-2">
                              <h2 className="text-sm font-medium text-coolGray-900">
                                {data.status === "Credited" &&
                                  `${data.travelerName} Paid ${data.amount}`}
                                {data.status === "Cancelled" &&
                                  `${data.travelerName} Cancelled ${data.packageName}`}
                              </h2>
                              <h2 className="text-sm font-medium text-coolGray-900">
                                {data.status === "Credited" &&
                                  `${data.packageName}`}
                                {data.status === "Cancelled" &&
                                  `${data.packageName}`}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="w-auto p-2">
                          <p
                            className={`text-xs text-${
                              data.status === "Credited"
                                ? "green-600"
                                : "red-600"
                            } font-medium`}
                          >
                            {data.status === "Credited" && `Booked`}
                            {data.status === "Cancelled" && `Cancelled`}
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
      </div>
    </>
  );
}
