import { Routes, Route } from "react-router-dom";
import HostLoginPage from "../Pages/Host/Login";
import HostSignupPage from "../Pages/Host/SignUp";
import Otp from "../Components/Common/Otp"
import Home from "../Pages/Host/Home";

export default function HostRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<HostLoginPage />} />
        <Route path="/signup" element={<HostSignupPage />} />
        <Route path="/otp" element={<Otp who="host" />} />
      </Routes>
    </>
  );
}
