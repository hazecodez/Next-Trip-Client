import axiosInstance from "./AxiosInstance";

interface LoginType {
  email?: string;
  password?: string;
  name?: string;
  sub?:string;
}
const HostAPIs = {
  signup: async (formData: LoginType) => {
    try {
      console.log(formData);
      const signUpResponse = await axiosInstance.post("/host/signup", formData);
      
      
      return signUpResponse;
    } catch (error) {
      console.log("Didn't get response from Host signup API", error);
    }
  },
  verifyOTP: async (otp: string) => {
    try {
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
};

export default HostAPIs;
