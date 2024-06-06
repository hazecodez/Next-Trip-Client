import axiosInstance from "./AxiosInstance";
import Package from "../Interfaces/common/Package";
import LoginType from "../Interfaces/common/LoginType";
import { changePass } from "../Interfaces/Interfaces";

axiosInstance.interceptors.request.use(
  (config) => {
    if (config && config.url && config?.url.includes("host")) {
      const hostToken = localStorage.getItem("host");
      if (hostToken) {
        config.headers["Authorization"] = `${hostToken}`;
        // console.log("host Token in each request: ", hostToken);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.role === "host" &&
      error.response.data.blocked === true
    ) {
      // console.log("Remove Host token when response error");
      localStorage.removeItem("host");
      window.location.href = "/host/login";
    }
    return Promise.reject(error);
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
  verifyOTP: async (otp: string, token: string) => {
    try {
      const otpResponse = await axiosInstance.post("/host/verify_otp", {
        otp,
        token,
      });
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
  create_package: async (form: Package, images: string[]) => {
    try {
      const response = await axiosInstance.post("/host/create_package", {
        images,
        form,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from host create_package API", error);
    }
  },
  update_package: async (form: Package, images: string[]) => {
    try {
      const response = await axiosInstance.patch("/host/update_package", {
        form,
        images,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  package_list: async (currentPage: number) => {
    try {
      const response = await axiosInstance.get(
        `/host/package_list?page=${currentPage}`
      );
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
  confirm_forget_otp: async (otp: string, token: string) => {
    try {
      const response = await axiosInstance.post("/host/confirm_forget_otp", {
        otp,
        token,
      });
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from host confirm_forget_otp API",
        error
      );
    }
  },
  new_password: async (password: string, token: string) => {
    try {
      const response = await axiosInstance.post("/host/new_password", {
        password,
        token,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from host new_password API", error);
    }
  },
  bookings: async (id: string) => {
    try {
      const response = await axiosInstance.get(
        `/host/bookings?packageId=${id}`
      );
      return response;
    } catch (error) {
      console.log(error, "Didn't get response from host bookings API");
    }
  },
  host_profile: async () => {
    try {
      const response = await axiosInstance.get("/host/profile");
      return response;
    } catch (error) {
      console.log(error, "Didn't get response from host host_profile API");
    }
  },
  host_profile_update: async (data: LoginType) => {
    try {
      const response = await axiosInstance.post("/host/profile_update", data);
      return response;
    } catch (error) {
      console.log(error, "Didn't get response from host profile_update API");
    }
  },
  host_change_password: async (data: changePass) => {
    try {
      const response = await axiosInstance.post("/host/change_password", data);
      return response;
    } catch (error) {
      console.log(error, "Didn't get response from host change_password API");
    }
  },
  create_password: async (password: string) => {
    try {
      const response = await axiosInstance.post("/host/create_password", {
        password,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from host create_password API", error);
    }
  },
  dp_update: async (image: string) => {
    try {
      const response = await axiosInstance.post("/host/profile_dp", { image });
      return response;
    } catch (error) {
      console.log("Didn't get response from host dp_update API", error);
    }
  },
  dashboard: async () => {
    try {
      const response = await axiosInstance.get("/host/dashboard");
      return response;
    } catch (error) {
      console.log("Didn't get response from host dashboard API", error);
    }
  },
  sales_report: async () => {
    try {
      const response = await axiosInstance.get("/host/sales");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default HostAPIs;
