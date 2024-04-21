import { Routes, Route } from "react-router-dom";
import HostLoginPage from "../Pages/Host/Login";
import HostSignupPage from "../Pages/Host/SignUp";
import Otp from "../Components/Common/Otp";
import Dashboard from "../Pages/Host/Dashboard";
import MyPackages from "../Pages/Host/MyPackages";
import Schedules from "../Pages/Host/Schedules";
import CreatePackage from "../Components/Host/CreatePackage";

export default function HostRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<HostLoginPage />} />
        <Route path="/signup" element={<HostSignupPage />} />
        <Route path="/otp" element={<Otp who="host" />} />
        <Route path="/my_packages" element={<MyPackages />} />
        <Route path="/create_package" element={<CreatePackage />} />
        <Route path="/schedules" element={<Schedules />} />
      </Routes>
    </>
  );
}
