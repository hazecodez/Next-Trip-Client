import { bookingData, LoginType } from "../Interfaces/Interfaces";
import axiosInstance from "./AxiosInstance";
import Cookies from "js-cookie";

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { status, data } = error.response;
//     if (status === 401 && data.blocked) {
//       // User is blocked, handle accordingly
//       console.log("User is blocked:", data.message);
//     }
//     return Promise.reject(error);
//   }
// );

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
      if (response.data.blocked) {
        Cookies.remove("traveler");
        window.location.href = "/login";
      }
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
      if (response.data.blocked) {
        Cookies.remove("traveler");
        window.location.href = "/login";
      }

      return response;
    } catch (error) {
      console.log(
        "Didn't get response from traveler package_details API",
        error
      );
    }
  },
  new_conversation: async (hostId: string) => {
    try {
      const response = await axiosInstance.post(
        `/new_conversation?hostId=${hostId}`
      );
      if (response.data.blocked) {
        Cookies.remove("traveler");
        window.location.href = "/login";
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  get_conversations: async (userId: string) => {
    try {
      const response = await axiosInstance.get(
        `/get_conversations?userId=${userId}`
      );
      if (response.data.blocked) {
        Cookies.remove("traveler");
        window.location.href = "/login";
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  get_messages: async (conversationId: string) => {
    try {
      const response = await axiosInstance.patch(`/get_messages`, {
        conversationId,
      });
      if (response.data.blocked) {
        Cookies.remove("traveler");
        window.location.href = "/login";
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  new_message: async (
    text: string,
    conversationId: string,
    senderId: string
  ) => {
    try {
      const response = await axiosInstance.post(`/new_message`, {
        text,
        conversationId,
        senderId,
      });
      if (response.data.blocked) {
        Cookies.remove("traveler");
        window.location.href = "/login";
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  user_name: async (userId: string, who: string) => {
    try {
      const response = await axiosInstance.patch(`/find_user`, { userId, who });
      if (response.data.blocked) {
        Cookies.remove("traveler");
        window.location.href = "/login";
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  package_booking: async (Data: bookingData) => {
    try {
      const response = await axiosInstance.post("/package_booking", Data);
      return response;
    } catch (error) {
      console.log(
        error,
        "Didn't get response from traveler package_booking API"
      );
    }
  },
  booked_packages: async (id: string) => {
    try {
      const response = await axiosInstance.get(
        `/booked_packages?travelerId=${id}`
      );
      return response;
    } catch (error) {
      console.log(
        error,
        "Didn't get response from traveler booked_packages API"
      );
    }
  },
};

export default TravelerAPIs;
