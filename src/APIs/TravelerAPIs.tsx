import axiosInstance from "./AxiosInstance";

const TravelerAPIs = {
  signup: async (formData: any) => {
    try {
      const signUpResponse = await axiosInstance.post("/signup", formData);
      return signUpResponse;
    } catch (error) {
      console.log(error);
    }
  },
};

export default TravelerAPIs;
