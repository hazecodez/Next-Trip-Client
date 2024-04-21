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
};

export default TravelerAPIs;
