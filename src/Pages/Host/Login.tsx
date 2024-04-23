import AccountTab from "../../Components/Common/AccountTab";
import { useNavigate } from "react-router-dom";
import LoginSchema from "../../Validations/Traveler/LoginSchema";
import { useFormik } from "formik";
import { hostLogin } from "../../Redux/Slices/Host";
import { useDispatch } from "react-redux";
import HostAPIs from "../../APIs/HostAPIs";
import { toast } from "sonner";
import useGoogleLoginHook from "../../Utils/Common/useGoogleAuth";

interface formData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GoogleLogin = useGoogleLoginHook({ who: "host" });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: Submission,
    });
  async function Submission(loginData: formData) {
    try {
      const loginResponse = await HostAPIs.login(loginData);

      if (loginResponse?.data.verifiedHost.status) {
        toast.success(loginResponse.data.verifiedHost.message);
        dispatch(
          hostLogin({
            host: loginResponse.data.verifiedHost.host,
          })
        );
        navigate("/host/");
      } else {
        toast.error(loginResponse?.data.verifiedHost.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section
        className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center  "
        style={{ backgroundImage: "url('../Admin/LoginBg.jpg')" }}
      >
        <div className=" p-5 flex rounded-2xl shadow-lg max-w-3xl glass">
          <div className="md:w-1/2 px-3">
            <AccountTab tabNumber="2" />

            {/* <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p> */}
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">
                  Work Email Address
                </label>
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
                      : "border focus:border-red-800 focus:bg-white"
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
                      : "border focus:border-red-800 focus:bg-white"
                  } focus:outline-none`}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              <div className="text-right mt-2">
                <a
                  onClick={()=> navigate("/host/forget_pass")}
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full block bg-[#C63D2F] hover:dark:bg-red-700 focus:bg-red-400 text-white font-semibold rounded-lg
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

            <div className="text-sm text-base-100 flex  justify-between items-center mt-3">
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
            <h2 className="text-2xl font-bold text-red-900">
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
    </>
  );
}
