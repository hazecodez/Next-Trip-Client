import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar";
import AccountTab from "../../Common/AccountTab";

export default function SignUp() {
  return (
    <>
      <Navbar />
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            {/* <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
        <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p> */}
            <form className="mt-6" action="#" method="POST">
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Full Name"
                  className="w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Enter Mobile Number"
                  className="w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Enter Password"
                  className="w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">
                  Confirm strong Password
                </label>
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Confirm Password"
                  className="w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full block dark:bg-gray-800 hover:dark:bg-gray-700 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-2 mt-6"
              >
                Create Account
              </button>
            </form>

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
              <i className="fa-brands fa-google"></i>
              <span className="ml-4">Sign Up with Google</span>
            </button>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you already have an account...</p>
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Login
              </a>
            </div>
          </div>

          <div className="w-1/2 md:block hidden ">
            <br />
            <AccountTab />

            <br />
            <img
              src="../Traveler/LoginPage.png"
              className="rounded-2xl"
              alt="page img"
            />
            <img
              src="../Traveler/SignUpLogo.png"
              className="rounded-2xl"
              alt="page img"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
