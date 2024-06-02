import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import TravelerAPIs from "../../APIs/TravelerAPIs";
import { TravelerLogin } from "../../Redux/Slices/Traveler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HostAPIs from "../../APIs/HostAPIs";
import { hostLogin } from "../../Redux/Slices/Host";
import { adminLogin } from "../../Redux/Slices/Admin";
import AdminAPI from "../../APIs/AdminAPIs";

const useGoogleLoginHook = ({
  who,
}: {
  who: "traveler" | "host" | "admin";
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);
      try {
        if (who === "traveler") {
          
          const googleResponse = await TravelerAPIs.google_Auth(userInfo);
          if (googleResponse?.data.status) {
            localStorage.setItem("traveler", googleResponse?.data.token);
            toast.success(googleResponse.data.message);
            
            dispatch(
              TravelerLogin({ traveler: googleResponse.data.travelerData })
            );
            navigate("/");
          } else {
            toast.error(googleResponse?.data.message);
          }
        } else if (who === "host") { 
          const googleResponse = await HostAPIs.google_Auth(userInfo);
          if (googleResponse?.data.status) {
            localStorage.setItem("host",googleResponse.data.token)
            toast.success(googleResponse.data.message);
            if (googleResponse.data.token) {
              dispatch(hostLogin({ host: googleResponse.data.hostData }));
              navigate("/host/");
            }
          } else {
            toast.error(googleResponse?.data.message);
          }
        } else if (who === "admin") {
          const googleResponse = await AdminAPI.google_Auth(userInfo);
          if (googleResponse?.data.status) {
            localStorage.setItem("adminToken",googleResponse.data.token);
            toast.success(googleResponse.data.message);
            dispatch(adminLogin({ admin: googleResponse.data.adminData }));
            navigate("/admin/");
          } else {
            toast.error(googleResponse?.data.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return GoogleLogin;
};

export default useGoogleLoginHook;
