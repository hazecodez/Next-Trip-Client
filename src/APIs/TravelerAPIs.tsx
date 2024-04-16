import axiosInstance from "./AxiosInstance";
interface LoginType {
  email: string;
  password: string;
}
interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const TravelerAPIs = {
  signup: async (formData: FormValues) => {
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
  login: async (formData: LoginType) => {
    try {
      const loginResponse = await axiosInstance.post("/login", formData);
      return loginResponse;
    } catch (error) {
      console.log("Didn't get response from traveler login API", error);
    }
  },
};

export default TravelerAPIs;
