import { useNavigate } from "react-router-dom";
import useGoogleLoginHook from "../../Utils/Common/useGoogleAuth";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "sonner";
import { adminLogin } from "../../Redux/Slices/Admin";
import LoginSchema from "../../Validations/Traveler/LoginSchema";
import AdminAPI from "../../APIs/AdminAPIs";

interface LoginType {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const GoogleLogin = useGoogleLoginHook({ who: "admin" });
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
      const loginResponse = await AdminAPI.login(LoginData);

      if (loginResponse?.data.status) {
        toast.success(loginResponse.data.message);
        dispatch(
          adminLogin({
            admin: loginResponse.data.adminData,
          })
        );
        navigate("/admin/");
      } else {
        toast.error(loginResponse?.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        className="hero min-h-screen bg-base-200"
        style={{ backgroundImage: "url('../Admin/LoginBg.jpg')" }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-right">
            <h1 className="text-5xl font-bold text-base-100">
              Welcome Back !!
            </h1>
            <p className="py-6 text-right text-black ">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi
            </p>
          </div>
          
          <div className="card glass shrink-0 w-full max-w-sm shadow-2xl ">
            <form className="card-body " onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Email</span>
                </label>
                <input
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  id="email"
                  value={values.email}
                  placeholder="Enter Email Address"
                  className={`input glass input-bordered ${
                    errors.email && touched.email
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  id="password"
                  value={values.password}
                  type="password"
                  placeholder="Enter Password"
                  className={`input input-bordered glass ${
                    errors.password && touched.password
                      ? "border focus:border-red-500 focus:bg-red-100"
                      : ""
                  }`}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-base-100">
                  Login
                </button>
              </div>
              <div className="mt-1 grid grid-cols-3 items-center text-gray-500">
                <hr className="border-gray-500" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-500" />
              </div>
              <button
                onClick={() => {
                  GoogleLogin();
                }}
                className=" glass border shadow py-2 w-full rounded-xl mt-1 flex justify-center text-gray-800 items-center text-sm hover:scale-105 duration-300 "
              >
                <i className="fa-brands fa-google"></i>
                <span className="ml-4">Login with Google</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
