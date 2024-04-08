import { Routes, Route } from "react-router-dom";
import HostLoginPage from "../Pages/Host/HostLoginPage";
import HostSignupPage from "../Pages/Host/HostSignupPage";
import OtpPage from "../Pages/Traveler/OtpPage";

export default function HostRouter() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<HostLoginPage />} />
        <Route path="/signup" element={<HostSignupPage />} />
        <Route path="/otp" element={<OtpPage/>} />
      </Routes>
    </>
  );
}
