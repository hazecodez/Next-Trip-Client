import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import LoginType from "../../Interfaces/common/LoginType";
import ForgetSchema from "../../Validations/Traveler/ForgetSchema";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { toast } from "sonner";
import HostAPIs from "../../APIs/HostAPIs";

export default function ForgetPass({ who }: { who: "traveler" | "host" }) {
  const navigate = useNavigate();
  const { errors, touched, values, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: ForgetSchema,
      onSubmit: submit,
    });
  async function submit(form: LoginType) {
    try {
      if (who === "traveler") {
        const response = await TravelerAPIs.forget_pass(form.email as string);
        if (response?.data.status) {
          localStorage.setItem("forget", response?.data.token);
          toast.success(response.data.message);
          navigate("/otp");
        } else {
          toast.error(response?.data.message);
        }
      } else {
        const response = await HostAPIs.forget_pass(form.email as string);
        if (response?.data.status) {
          localStorage.setItem("forget", response?.data.token);
          toast.success(response.data.message);
          navigate("/host/otp");
        } else {
          toast.error(response?.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section
        className="border-red-500  min-h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('../Admin/LoginBg.jpg')" }}
      >
        <div className="p-5 flex rounded-2xl shadow-lg max-w-3xl glass">
          <div className="md:w-1/2 px-3">
            {/* <p className="text-sm mt-4 text-[#002D74]">If you have an account, please login</p> */}
            <form className="mt-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className={`block ${
                    who === "host" ? "text-red-900" : "text-base-100"
                  } font-bold`}
                >
                  Email Address
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-gray-800 focus:bg-white focus:outline-none`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full block ${
                  who === "host" ? "bg-red-900" : "bg-base-100"
                } hover:dark:bg-red-500 focus:bg-gray-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6`}
              >
                Forget Password
              </button>
            </form>

            <div className="mt-7 grid grid-cols-3 items-center text-base-100">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <div className="text-sm flex text-base-100 justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <a
                onClick={() =>
                  who === "host"
                    ? navigate("/host/signup")
                    : navigate("/signup")
                }
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Register
              </a>
            </div>
          </div>

          <div className="w-1/2 md:block hidden ">
            <br />
            <h2 className="text-2xl font-bold text-base-100">
              Enter Your Email Address to Recover your password
            </h2>
            <br />
            <img
              src="../Host/SignUpLogo.png"
              className="rounded-2xl"
              alt="page img"
            />
            {/* <img
              src="../Traveler/LoginPage.png"
              className="rounded-2xl"
              alt="page img"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
}
