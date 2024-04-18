import Navbar from "../../Components/Traveler/Navbar";
import Footer from "../../Components/Common/Footer";
import AccountTab from "../../Components/Common/AccountTab";
import { useNavigate } from "react-router-dom";
import LoginSchema from "../../Validations/Traveler/LoginSchema";
import { useFormik } from "formik";
import { toast } from "sonner";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { TravelerLogin } from "../../Redux/Slices/Traveler";
import { useDispatch } from "react-redux";
import useGoogleLoginHook from "../../Utils/Common/useGoogleAuth";

interface LoginType {
  email: string;
  password: string;
}
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GoogleLogin = useGoogleLoginHook({ who: "traveler" });

  const { errors, handleBlur, handleChange, handleSubmit, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: Submission,
    });
  async function Submission(LoginData: LoginType) {
    try {
      const loginResponse = await TravelerAPIs.login(LoginData);

      if (loginResponse?.data.verifiedTraveler.status) {
        toast.success(loginResponse.data.verifiedTraveler.message);
        dispatch(
          TravelerLogin({
            traveler: loginResponse.data.verifiedTraveler.traveler,
          })
        );
        navigate("/");
      } else {
        toast.error(loginResponse?.data.verifiedTraveler.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar />
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-3">
            <AccountTab tabNumber="1" />

            {/* <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p> */}
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 ${
                    errors.email && touched.email
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : "border focus:border-gray-800 focus:bg-white"
                  } focus:outline-none`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 ${
                    errors.password && touched.password
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : "border focus:border-gray-800 focus:bg-white"
                  } focus:outline-none`}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
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
                className="w-full block bg-base-100 hover:dark:bg-gray-700 focus:bg-gray-400 text-white font-semibold rounded-lg
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

            <button
              onClick={() => {
                GoogleLogin();
              }}
              className="bg-white border shadow py-2 w-full rounded-xl mt-5 flex justify-center text-gray-800 items-center text-sm hover:scale-105 duration-300 "
            >
              <i className="fa-brands fa-google"></i>
              <span className="ml-4">Login with Google</span>
            </button>

            <div className="text-sm flex text-base-100 justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <a
                onClick={() => navigate("/signup")}
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Register
              </a>
            </div>
          </div>

          <div className="w-1/2 md:block hidden ">
            <br />
            <h2 className="text-2xl font-bold text-base-100">
              Login Your Personal Account
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
      <Footer bgColor="bg-base-100" Logo="../Traveler/Logo.png" />
    </>
  );
}