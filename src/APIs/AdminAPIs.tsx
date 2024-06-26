import axiosInstance from "./AxiosInstance";
import LoginType from "../Interfaces/common/LoginType";

axiosInstance.interceptors.request.use(
  (config) => {
    if (config && config.url && config?.url.includes("admin")) {
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        config.headers["Authorization"] = `${adminToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
  travelers: async (searchTerm: string, currentPage: number) => {
    try {
      const response = await axiosInstance.get(
        `/admin/travelers?search=${searchTerm}&page=${currentPage}`
      );
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from admin get travelers list API",
        error
      );
    }
  },
  travelerAction: async (id: string) => {
    try {
      const response = await axiosInstance.patch("/admin/traveler_action", {
        id,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from admin traveler action  API", error);
    }
  },
  hosts: async (searchTerm: string, currentPage: number) => {
    try {
      const response = await axiosInstance.get(
        `/admin/hosts?search=${searchTerm}&page=${currentPage}`
      );
      return response;
    } catch (error) {
      console.log("Didn't get response from admin get hosts list API", error);
    }
  },
  hostAction: async (id: string) => {
    try {
      const response = await axiosInstance.patch("/admin/host_action", { id });
      return response;
    } catch (error) {
      console.log("Didn't get response from admin host action  API", error);
    }
  },
  hostVerify: async (id: string) => {
    try {
      const response = await axiosInstance.patch("/admin/host_verify", { id });
      return response;
    } catch (error) {
      console.log("Didn't get response from admin host Verify  API", error);
    }
  },
  packages: async (searchTerm: string, currentPage: number) => {
    try {
      const response = await axiosInstance.get(
        `/admin/packages?search=${searchTerm}&page=${currentPage}`
      );
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from admin get packages list API",
        error
      );
    }
  },
  package_Actions: async (id: string | undefined) => {
    try {
      const response = await axiosInstance.patch("/admin/package_action", {
        id,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from admin package_Actions API", error);
    }
  },
  blogs: async (searchTerm: string, currentPage: number) => {
    try {
      const response = await axiosInstance.get(
        `/admin/blogs?search=${searchTerm}&page=${currentPage}`
      );
      return response;
    } catch (error) {
      console.log(
        "Didn't get response from admin get travelers list API",
        error
      );
    }
  },
  blogAction: async (id: string) => {
    try {
      const response = await axiosInstance.patch("/admin/blog_action", {
        id,
      });
      return response;
    } catch (error) {
      console.log("Didn't get response from admin traveler action  API", error);
    }
  },
  dashboard: async () => {
    try {
      const response = await axiosInstance.get("/admin/dashboard");
      return response;
    } catch (error) {
      console.log("Didn't get response from admin dashboard API", error);
    }
  },
  sales_report: async () => {
    try {
      const response = await axiosInstance.get("/admin/sales");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AdminAPI;
