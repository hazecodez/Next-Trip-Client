import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Admin/LoginPage";
import TravelersList from "../Pages/Admin/TravelersList";
import HostsList from "../Pages/Admin/HostsList";
import Blogs from "../Pages/Admin/Blogs";
import Packages from "../Pages/Admin/Packages";
import Dashboard from "../Pages/Admin/Dashboard";

export default function AdminRoute() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/travelers" element={<TravelersList/>} />
        <Route path="/hosts" element={<HostsList/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/packages" element={<Packages/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  );
}
