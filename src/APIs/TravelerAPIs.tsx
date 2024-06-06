import {
  Blog,
  bookingData,
  changePass,
  LoginType,
} from "../Interfaces/Interfaces";
import axiosInstance from "./AxiosInstance";

axiosInstance.interceptors.request.use(
  (config) => {
    if (config && config.url && !config?.url.includes("host") && !config?.url.includes("admin")) {
      const travelerToken = localStorage.getItem("traveler");  
      if (travelerToken) {
        config.headers["Authorization"] = `${travelerToken}`;
        console.log("Traveler Token in each request: ", travelerToken);
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
      error.response.data.role === "traveler" &&
      error.response.data.blocked === true
    ) {
      console.log("Remove Traveler token when response error");
      localStorage.removeItem("traveler");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const TravelerAPIs = {
  signup: async (formData: LoginType) => {
    try {
      const signUpResponse = await axiosInstance.post("/signup", formData);
      return signUpResponse;
    } catch (error) {
      console.log("Didn't get response from traveler signup API", error);
    }
  },
  confirmOTP: async (otp: string, token: string) => {
    try {
      const otpResponse = await axiosInstance.post("/verify_otp", {
        otp,
        token,
      });
      return otpResponse;
    } catch (error) {
      console.log("Didn't get response from travler confirmOTP API", error);
    }
  },
  resendOtp: async (token: string) => {
    try {
      const response = await axiosInstance.post("/resend_otp", { token });
      return response;
    } catch (error) {
      console.log("Didn't get response from resend otp API", error);
    }
  },
  login: async (formData: LoginType) => {
    try {
      const loginResponse = await axiosInstance.post("/login", formData);
      console.log("ivdeyo login api", loginResponse);
      
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
  package_list: async (currentPage: number) => {
    try {
      const response = await axiosInstance.get(
        `/package_list?page=${currentPage}`
      );
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
  confirm_forget_otp: async (otp: string, token: string) => {
    try {
      const response = await axiosInstance.post("/confirm_forget_otp", {
        otp,
        token,
      });
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from traveler confirm_forget_otp API",
        error
      );
    }
  },
  new_password: async (password: string, token: string) => {
    try {
      const response = await axiosInstance.post("/new_password", {
        password,
        token,
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
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  user_name: async (userId: string, who: string) => {
    try {
      const response = await axiosInstance.patch(`/find_user`, { userId, who });
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
  booked_packages: async (id: string, currentPage: number) => {
    try {
      const response = await axiosInstance.get(
        `/booked_packages?travelerId=${id}&page=${currentPage}`
      );
      return response;
    } catch (error) {
      console.log(
        error,
        "Didn't get response from traveler booked_packages API"
      );
    }
  },
  traveler_profile: async () => {
    try {
      const response = await axiosInstance.get("/profile");
      return response;
    } catch (error) {
      console.log(
        error,
        "Didn't get response from traveler traveler_profile API"
      );
    }
  },
  profile_update: async (data: LoginType) => {
    try {
      const response = await axiosInstance.post("/profile_update", data);
      return response;
    } catch (error) {
      console.log(
        error,
        "Didn't get response from traveler profile_update API"
      );
    }
  },
  change_password: async (data: changePass) => {
    try {
      const response = await axiosInstance.post("/change_password", data);
      return response;
    } catch (error) {
      console.log(
        error,
        "Didn't get response from traveler change_password API"
      );
    }
  },
  create_password: async (password: string) => {
    try {
      const response = await axiosInstance.post("/create_password", {
        password,
      });
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from traveler create_password API",
        error
      );
    }
  },
  dp_update: async (image: string) => {
    try {
      const response = await axiosInstance.post("/profile_dp", { image });
      return response;
    } catch (error) {
      console.log("Didn't get response from traveler dp_update API", error);
    }
  },
  cancel_booking: async (id: string) => {
    try {
      const response = await axiosInstance.patch("/cancel_booking", { id });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  create_blog: async (form: Blog, image: string, name: string) => {
    try {
      const response = await axiosInstance.post("/create_blog", {
        form,
        image,
        name,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from traveler create_blog API", error);
    }
  },
  fetch_blogs: async (currentPage: number) => {
    try {
      const response = await axiosInstance.get(`/blogs?page=${currentPage}`);
      return response;
    } catch (error) {
      console.log("Didn't get response from traveler fetch_blogs API", error);
    }
  },
  blog_details: async (id: string) => {
    try {
      const response = await axiosInstance.patch("/blog_details", {
        blogId: id,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from traveler blog_details API", error);
    }
  },
  like_unlike_blog: async (blogId: string) => {
    try {
      const response = await axiosInstance.patch("/like_unlike_blog", {
        blogId: blogId,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from traveler like_blog API", error);
    }
  },
  comment_blog: async (blogId: string, comment: string) => {
    try {
      const response = await axiosInstance.patch("/comment_blog", {
        blogId: blogId,
        comment: comment,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from traveler comment_blog API", error);
    }
  },
  blogs_by_user: async () => {
    try {
      const response = await axiosInstance.get("/blogs_by_user");
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from traveler blogs_by_userId API",
        error
      );
    }
  },
  remove_blog: async (blogId: string) => {
    try {
      const response = await axiosInstance.patch("/remove_blog", { blogId });
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from traveler blogs_by_userId API",
        error
      );
    }
  },
};

export default TravelerAPIs;
