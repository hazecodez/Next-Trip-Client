import axiosInstance from "./AxiosInstance";

interface LoginType {
  email?: string;
  password?: string;
  sub?: string;
  name?: string;
}

const TravelerAPIs = {
  signup: async (formData: LoginType) => {
    try {
      const signUpResponse = await axiosInstance.post("/signup", formData);
      return signUpResponse;
    } catch (error) {
      console.log("Didn't get response from traveler signup API", error);
    }
  },
  confirmOTP: async (otp: string) => {
    try {
      const otpResponse = await axiosInstance.post("/verify_otp", { otp });
      return otpResponse;
    } catch (error) {
      console.log("Didn't get response from travler confirmOTP API", error);
    }
  },
  resendOtp: async () => {
    try {
      const response = await axiosInstance.get("/resend_otp");
      return response;
    } catch (error) {
      console.log("Didn't get response from resend otp API", error);
    }
  },
  login: async (formData: LoginType) => {
    try {
      const loginResponse = await axiosInstance.post("/login", formData);
      return loginResponse;
    } catch (error) {
      console.log("Didn't get response from traveler login API", error);
    }
  },
  google_Auth: async (userInfo: LoginType) => {
    try {
      const googleResponse = await axiosInstance.post(
        "/google_login",
        userInfo
      );
      return googleResponse;
    } catch (error) {
      console.log("Didn't get response from traveler google-login API", error);
    }
  },
  package_list: async () => {
    try {
      const response = await axiosInstance.get("/package_list");
      return response;
    } catch (error) {
      console.log("Didn't get response from traveler package_list API", error);
    }
  },
  forget_pass: async (email: string) => {
    try {
      const response = await axiosInstance.patch("/forget_pass", {
        email: email,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from traveler forget_pass API", error);
    }
  },
  confirm_forget_otp: async (otp: string) => {
    try {
      const response = await axiosInstance.post("/confirm_forget_otp", { otp });
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from traveler confirm_forget_otp API",
        error
      );
    }
  },
  new_password: async (password: string) => {
    try {
      const response = await axiosInstance.post("/new_password", {
        password,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from traveler new_password API", error);
    }
  },
  package_details: async (id: string) => {
    try {
      const response = await axiosInstance.patch("/package_details", {
        id,
      });

      return response;
    } catch (error) {
      console.log("Didn't get response from traveler package_details API", error);
    }
  },
};

export default TravelerAPIs;
