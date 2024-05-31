import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Interfaces/Interfaces";
import HostAPIs from "../../APIs/HostAPIs";
import HostChart from "./HostChart";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function fetchDash() {
      const response = await HostAPIs.dashboard();
      if (response?.data.status) {
        setUser(response.data.Host);
        setCount(response.data.packageCount);
      }
    }
    fetchDash();
  }, []);
  return (
    <>
      <div className=" bg-gray-100">
        <div className="p-4  ">
          <div className="p-4  dark:border-gray-700">
            <div className="  flex flex-col items-center justify-center  md:flex-row md:items-center md:justify-evenly h-28 mb-4 rounded-md bg-[#C63D2F]">
              <p className="text-lg text-[#FFBB5C] font-bold  ">
                Create New Package
              </p>

              <button
                onClick={() => navigate("/host/create_package")}
                className="btn btn-wide bg-[#C63D2F] border border-[#FFBB5C] hover:border-[#C63D2F] text-[#FFBB5C] hover:bg-[#FFBB5C] hover:text-[#C63D2F] text-xl"
              >
                Create Package
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <HostChart />

              <div
                className={`bg-gradient-to-r from-[#C63D2F] to-[#FFBB5C] h-full pt-10 pb-16 flex flex-col md:flex-row md:justify-evenly items-center rounded-b`}
              >
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div
                      className="flip-card-front"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #FF9B50, #C63D2F)",
                      }}
                    >
                      <p className="heading_8264">MYBIZ WALLET</p>
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
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #FF9B50, #C63D2F)",
                      }}
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
            </div>
          </div>
          <div className="flex items-center justify-evenly rounded bg-gradient-to-r from-[#C63D2F] to-[#FFBB5C] dark:bg-gray-800">
            <p className="text-2xl font-bold text-white">
              {`No of Packages  : ${count}`}{" "}
            </p>
            <img src="../Traveler/successLogo.png" className="w-24  " />
          </div>
        </div>
      </div>
    </>
  );
}
