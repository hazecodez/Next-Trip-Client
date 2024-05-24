import { Routes, Route } from "react-router-dom";
import HostLoginPage from "../Pages/Host/Login";
import HostSignupPage from "../Pages/Host/SignUp";
import Otp from "../Components/Common/Otp";
import Dashboard from "../Pages/Host/Dashboard";
import MyPackages from "../Pages/Host/MyPackages";
import Schedules from "../Pages/Host/SchedulesPage";
import CreatePackage from "../Components/Host/CreatePackage";
import EditPackage from "../Components/Host/EditPackage";
import ForgetPass from "../Components/Common/ForgetPass";
import NewPass from "../Components/Common/NewPass";
import IsLoggedIn from "../Middlewares/Host/IsLoggedIn";
import IsLoggedOut from "../Middlewares/Host/IsLoggedOut";
import PackageDetails from "../Pages/Host/PackageDetails";
import ChatPage from "../Pages/Host/ChatPage";
import ProfilePage from "../Pages/Host/ProfilePage";
import Error404 from "../Pages/Common/Error404";
import Video from "../Pages/Traveler/VideoChat";

export default function HostRouter() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <IsLoggedIn>
              <Dashboard />
            </IsLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <IsLoggedOut>
              <HostLoginPage />
            </IsLoggedOut>
          }
        />
        <Route
          path="/signup"
          element={
            <IsLoggedOut>
              <HostSignupPage />
            </IsLoggedOut>
          }
        />
        <Route
          path="/otp"
          element={
            <IsLoggedOut>
              <Otp who="host" />
            </IsLoggedOut>
          }
        />
        <Route
          path="/forget_pass"
          element={
            <IsLoggedOut>
              <ForgetPass who="host" />
            </IsLoggedOut>
          }
        />
        <Route
          path="/new_pass"
          element={
            <IsLoggedOut>
              <NewPass who="host" />
            </IsLoggedOut>
          }
        />
        <Route
          path="/my_packages"
          element={
            <IsLoggedIn>
              <MyPackages />
            </IsLoggedIn>
          }
        />
        <Route
          path="/create_package"
          element={
            <IsLoggedIn>
              <CreatePackage />
            </IsLoggedIn>
          }
        />
        <Route
          path="/edit_package/:id"
          element={
            <IsLoggedIn>
              <EditPackage />
            </IsLoggedIn>
          }
        />
        <Route
          path="/schedules"
          element={
            <IsLoggedIn>
              <Schedules />
            </IsLoggedIn>
          }
        />
        <Route
          path="/package_details/:id"
          element={
            <IsLoggedIn>
              <PackageDetails />
            </IsLoggedIn>
          }
        />
        <Route
          path="/chat"
          element={
            <IsLoggedIn>
              <ChatPage />
            </IsLoggedIn>
          }
        />
        <Route
          path="/profile"
          element={
            <IsLoggedIn>
              <ProfilePage />
            </IsLoggedIn>
          }
        />
        <Route
          path="/video"
          element={
            <IsLoggedIn>
              <Video />
            </IsLoggedIn>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}
