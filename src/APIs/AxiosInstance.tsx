import axios from "axios";

const baseURL = "http://localhost:5050";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
