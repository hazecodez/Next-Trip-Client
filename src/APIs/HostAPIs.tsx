import axiosInstance from "./AxiosInstance";
interface formData {
  name: string;
  email: string;
  password: string;
}
interface LoginType {
  email: string;
  password: string;
}
const HostAPIs = {
  signup: async (formData: formData) => {
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
};

export default HostAPIs;
