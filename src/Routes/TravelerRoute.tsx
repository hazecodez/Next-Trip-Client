import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Traveler/Login";
import SignUp from "../Pages/Traveler/SignUp";
import Home from "../Pages/Traveler/Home";
import Otp from "../Components/Common/Otp";

export default function TravelerRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/otp" element={<Otp who="traveler" />} />
      <Route path="/packages" />
      <Route path="/blogs" />
      <Route path="/stays" />
      <Route path="/flights" />
    </Routes>
  );
}
