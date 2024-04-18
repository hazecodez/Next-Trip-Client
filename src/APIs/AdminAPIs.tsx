import axiosInstance from "./AxiosInstance";

interface LoginType {
  email?: string;
  password?: string;
  sub?: string;
  name?: string;
}

const AdminAPI = {
  login: async (formData: LoginType) => {
    try {
      const loginData = await axiosInstance.post("/admin/login", formData);
      return loginData;
    } catch (error) {
      console.log("Didn't get response from admin admin Login API", error);
    }
  },
  google_Auth: async (adminInfo: LoginType) => {
    try {
      const googleResponse = await axiosInstance.post(
        "/admin/google_login",
        adminInfo
      );
      return googleResponse;
    } catch (error) {
      console.log("Didn't get response from admin google-login API", error);
    }
  },
};

export default AdminAPI;
