import axiosInstance from "./AxiosInstance";
import Package from "../Interfaces/common/Package";
import LoginType from "../Interfaces/common/LoginType";
import Cookies from "js-cookie";

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.blocked === true
    ) {
      Cookies.remove("host");
      window.location.href = "/host/login";
    }
  }
);

const HostAPIs = {
  signup: async (formData: LoginType) => {
    try {
      const signUpResponse = await axiosInstance.post("/host/signup", formData);

      return signUpResponse;
    } catch (error) {
      console.log("Didn't get response from Host signup API", error);
    }
  },
  verifyOTP: async (otp: string) => {
    try {
      console.log("ethi");

      const otpResponse = await axiosInstance.post("/host/verify_otp", { otp });
      return otpResponse;
    } catch (error) {
      console.log("Didn't get response from host verifyOTP API", error);
    }
  },
  login: async (loginData: LoginType) => {
    try {
      const loginResponse = await axiosInstance.post("/host/login", loginData);
      return loginResponse;
    } catch (error) {
      console.log("Didn't get response from Host login API", error);
    }
  },
  google_Auth: async (hostInfo: LoginType) => {
    try {
      const googleResponse = await axiosInstance.post(
        "/host/google_login",
        hostInfo
      );
      return googleResponse;
    } catch (error) {
      console.log("Didn't get response from host google-login API", error);
    }
  },
  create_package: async (form: Package, images: never[]) => {
    try {
      const response = await axiosInstance.post("/host/create_package", {
        images,
        form,
      });
      if (response.data.blocked) {
        Cookies.remove("host");
        window.location.href = "/host/login";
      }
      return response;
    } catch (error) {
      console.log("Didn't get response from host create_package API", error);
    }
  },
  update_package: async (form: Package, images: never[]) => {
    try {
      const response = await axiosInstance.patch("/host/update_package", {
        form,
        images,
      });
      if (response.data.blocked) {
        Cookies.remove("host");
        window.location.href = "/host/login";
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  package_list: async () => {
    try {
      const response = await axiosInstance.get("/host/package_list");

      if (response.data.blocked) {
        Cookies.remove("host");
        window.location.href = "/host/login";
      }
      return response;
    } catch (error) {
      console.log("Didn't get response from host package_list API", error);
    }
  },
  package_details: async (id: string) => {
    try {
      const response = await axiosInstance.patch("/host/package_details", {
        id,
      });
      if (response.data.blocked) {
        Cookies.remove("host");
        window.location.href = "/host/login";
      }
      return response;
    } catch (error) {
      console.log("Didn't get response from host package_details API", error);
    }
  },
  forget_pass: async (email: string) => {
    try {
      const response = await axiosInstance.patch("/host/forget_pass", {
        email: email,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from host forget_pass API", error);
    }
  },
  confirm_forget_otp: async (otp: string) => {
    try {
      const response = await axiosInstance.post("/host/confirm_forget_otp", {
        otp,
      });
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from host confirm_forget_otp API",
        error
      );
    }
  },
  new_password: async (password: string) => {
    try {
      const response = await axiosInstance.post("/host/new_password", {
        password,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from host new_password API", error);
    }
  },
  bookings: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/host/bookings?packageId=${id}`);
      return response;
    } catch (error) {
      console.log(error, "Didn't get response from host bookings API");
    }
  },
};

export default HostAPIs;
