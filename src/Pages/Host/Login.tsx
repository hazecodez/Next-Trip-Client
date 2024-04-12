import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";
import AccountTab from "../../Components/Common/AccountTab";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar
        Class="border-red-700 bg-red-800 dark:bg-red-800 dark:border-red-800"
        logo="../Host/HostLogo.png"
        Tabs={["Dashboard", "My Packages", "Schedules", "Profile"]}
      />
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-3">
          <AccountTab tabNumber="2" />
           
            {/* <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p> */}
            <form className="mt-6" action="#" method="POST">
              <div>
                <label className="block text-gray-700">
                  Work Email Address
                </label>
                <input
                  type="email"
                  name=""
                  id="1"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name=""
                  id="2"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                />
              </div>

              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full block dark:bg-red-800 hover:dark:bg-red-700 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
              <i className="fa-brands fa-google"></i>
              <span className="ml-4">Login with Google</span>
            </button>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <a
                onClick={() => navigate("/host/signup")}
                className="text-sm font-semibold text-red-700 hover:text-red-900 focus:text-red-700"
              >
                Register
              </a>
            </div>
          </div>

          <div className="w-1/2 md:block hidden ">
            <br />
            <h2 className="text-2xl font-bold text-[#C63D2F]">
              Login Your MyBiz Account
            </h2>
            <br />
            <img
              src="../Traveler/LoginPage.png"
              className="rounded-2xl"
              alt="page img"
            />
          </div>
        </div>
      </section>
      <Footer Class="dark:bg-red-800" Logo="../Host/HostLogo.png"/>
    </>
  );
}
