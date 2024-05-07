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
};

export default AdminAPI;
