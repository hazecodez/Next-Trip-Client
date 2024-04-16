import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";
import SignUpSchema from "../../Validations/Traveler/SignUpSchema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import HostAPIs from "../../APIs/HostAPIs";

interface formdata {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function SignUp() {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: SignUpSchema,
      onSubmit: Submission,
    });
  async function Submission(FormData: formdata) {
    try {
      const signUpResponse = await HostAPIs.signup(FormData);
      if (signUpResponse?.data.status) {
        toast.success(`otp send to ${FormData.email}`)
        setTimeout(()=>{
          navigate("/host/otp");
        },3000)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Toaster richColors expand={true} position="top-right" />
      <Navbar
        Class="border-red-700 bg-red-800 dark:bg-red-800 dark:border-red-800"
        logo="../Host/HostLogo.png"
        Tabs={["Dashboard", "My Packages", "Schedules", "Profile"]}
      />
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-3">
            {/* <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
        <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p> */}
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Full Name"
                  className={`w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 ${
                    errors.name && touched.name
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : "border focus:border-red-800 focus:bg-white"
                  } focus:outline-none`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700">
                  Work Email Address
                </label>
                <input
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                  className={`w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 ${
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
                  className={`w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 ${
                    errors.password && touched.password
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : "border focus:border-red-800 focus:bg-white"
                  } focus:outline-none`}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className={`w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : "border focus:border-red-800 focus:bg-white"
                  } focus:outline-none`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full block dark:bg-red-800 hover:dark:bg-red-700 focus:bg-red-400 text-white font-semibold rounded-lg
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
                onClick={() => navigate("/host/login")}
                className="text-sm font-semibold text-red-700 hover:text-red-900 focus:text-red-700"
              >
                Login
              </a>
            </div>
          </div>

          <div className="w-1/2 md:block hidden ">
            <br />
            <h2 className="text-2xl font-bold text-[#C63D2F]">
              Register Your MyBiz Account
            </h2>

            <br />
            <img
              src="../Traveler/LoginPage.png"
              className="rounded-2xl"
              alt="page img"
            />
            <img
              src="../Host/SignUpLogo.png"
              className="rounded-2xl"
              alt="page img"
            />
          </div>
        </div>
      </section>
      <Footer Class="dark:bg-red-800" Logo="../Host/HostLogo.png" />
    </>
  );
}
