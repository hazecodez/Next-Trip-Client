import axios from "axios";

const baseURL = "https://next-trip-server.onrender.com";
// const baseURL = "https://furnicube.shop";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
