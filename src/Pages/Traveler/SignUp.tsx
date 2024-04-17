import Navbar from "../../Components/Common/Navbar";
import Footer from "../../Components/Common/Footer";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import SignUpSchema from "../../Validations/Traveler/SignUpSchema";
import { toast } from "sonner";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import useGoogleLoginHook from "../../Utils/Common/useGoogleAuth";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const navigate = useNavigate();

  const GoogleLogin = useGoogleLoginHook({ who: "traveler" });

  const { errors, handleBlur, handleChange, handleSubmit, values, touched } =
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

  async function Submission(formdata: FormValues) {
    try {
      await TravelerAPIs.signup(formdata);
      toast.success(`otp sent to ${formdata.email}`);
      navigate("/otp");
    } catch (error) {
      console.log("Traveler signup error :", error);
    }
  }

  return (
    <>
      <Navbar
        bgColor="bg-base-100"
        logo="../Traveler/Logo.png"
        Tabs={["Home", "Blogs", "Packages"]}
      />
      <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-3">
            {/* <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p> */}
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Full Name"
                  className={`w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 ${
                    errors.name && touched.name
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : "border focus:border-gray-800 focus:bg-white"
                  }  focus:outline-none`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>
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
                  className={`w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 ${
                    errors.email && touched.email
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : "border focus:border-gray-800 focus:bg-white"
                  }  focus:outline-none`}
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
                  placeholder="Enter Strong Password"
                  className={`w-full px-4 py-1 rounded-lg bg-gray-200 mt-2 ${
                    errors.password && touched.password
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : "border focus:border-gray-800 focus:bg-white"
                  }  focus:outline-none`}
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
                      : "border focus:border-gray-800 focus:bg-white"
                  }  focus:outline-none`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full block bg-base-100 hover:dark:bg-gray-700 focus:bg-gray-800 text-white font-semibold rounded-lg
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

            <button
              onClick={() => {
                GoogleLogin();
              }}
              className="bg-white border shadow py-2 w-full rounded-xl mt-5 flex justify-center text-gray-800 items-center text-sm hover:scale-105 duration-300 "
            >
              <i className="fa-brands fa-google"></i>
              <span className="ml-4">Login with Google</span>
            </button>

            <div className="text-sm text-base-100 flex justify-between items-center mt-3">
              <p>If you already have an account...</p>
              <a
                onClick={() => navigate("/login")}
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Login
              </a>
            </div>
          </div>

          <div className="w-1/2 md:block hidden ">
            <br />
            <h2 className="text-2xl font-bold text-[#092635]">
              Register Your Personal Account
            </h2>

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
      <Footer bgColor="bg-base-100" Logo="../Traveler/Logo.png" />
    </>
  );
}
