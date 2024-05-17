import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Admin/LoginPage";
import TravelersList from "../Pages/Admin/TravelersList";
import HostsList from "../Pages/Admin/HostsList";
import Blogs from "../Pages/Admin/Blogs";
import PackagePage from "../Pages/Admin/PackagePage";
import Dashboard from "../Pages/Admin/Dashboard";
import IsLoggedOut from "../Middlewares/Admin/IsLoggedOut";
import IsLoggedIn from "../Middlewares/Admin/IsLoggedIn";
import Error404 from "../Pages/Common/Error404";


export default function AdminRoute() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <IsLoggedOut>
              <LoginPage />
            </IsLoggedOut>
          }
        />
        <Route
          path="/travelers"
          element={
            <IsLoggedIn>
              <TravelersList />
            </IsLoggedIn>
          }
        />
        <Route
          path="/hosts"
          element={
            <IsLoggedIn>
              <HostsList />
            </IsLoggedIn>
          }
        />
        <Route
          path="/blogs"
          element={
            <IsLoggedIn>
              <Blogs />
            </IsLoggedIn>
          }
        />
        <Route
          path="/packages"
          element={
            <IsLoggedIn>
              <PackagePage />
            </IsLoggedIn>
          }
        />
        <Route
          path="/"
          element={
            <IsLoggedIn>
              <Dashboard />{" "}
            </IsLoggedIn>
          }
        />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </>
  );
}
