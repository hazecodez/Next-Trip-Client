import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import NewPassSchema from "../../Validations/Traveler/NewPassSchema";
import HostAPIs from "../../APIs/HostAPIs";
import { toast } from "sonner";
import TravelerAPIs from "../../APIs/TravelerAPIs";

interface newPassType {
  password: string;
  con_password: string;
}

export default function NewPass({ who }: { who: "host" | "traveler" }) {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        con_password: "",
      },
      validationSchema: NewPassSchema,
      onSubmit: Submission,
    });

  async function Submission(newPass: newPassType) {
    try {
      const password = newPass.password;
      if (who === "host") {
        const response = await HostAPIs.new_password(password);

        if (response?.data.status) {
          toast.success(response.data.message);
          navigate("/host/login");
        } else {
          toast.error(response?.data.message);
        }
      } else if (who === "traveler") {
        const response = await TravelerAPIs.new_password(password);
        if (response?.data.status) {
          toast.success(response.data.message);
          navigate("/login");
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
                  New Password
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Email Address"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-gray-800 focus:bg-white focus:outline-none`}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="mt-4">
                <label
                  className={`block ${
                    who === "host" ? "text-red-900" : "text-base-100"
                  } font-bold`}
                >
                  Confirm New Password
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.con_password}
                  type="password"
                  name="con_password"
                  id="con_password"
                  placeholder="Enter Password"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-gray-800 focus:bg-white focus:outline-none`}
                />
                {errors.con_password && touched.con_password && (
                  <p className="text-red-500 text-xs">{errors.con_password}</p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full block ${
                  who === "host" ? "bg-red-900" : "bg-base-100"
                } hover:dark:bg-red-500 focus:bg-gray-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6`}
              >
                New Password
              </button>
            </form>
          </div>

          <div className="w-1/2 md:block hidden ">
            <br />
            <h2 className="text-2xl font-bold text-base-100">
              Enter New Password
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
