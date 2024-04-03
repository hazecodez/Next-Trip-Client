import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Traveler/LoginPage";
import SignUp from "../Pages/Traveler/SignUpPage";
import Home from "../Pages/Traveler/HomePage";

export default function TravelerRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
