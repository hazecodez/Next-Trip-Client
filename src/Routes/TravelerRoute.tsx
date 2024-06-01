import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Traveler/Login";
import SignUp from "../Pages/Traveler/SignUp";
import Home from "../Pages/Traveler/Home";
import Otp from "../Components/Common/Otp";
import ForgetPass from "../Components/Common/ForgetPass";
import NewPass from "../Components/Common/NewPass";
import IsLogged from "../Middlewares/Traveler/IsLoggedIn";
import IsLoggedOut from "../Middlewares/Traveler/IsLoggedOut";
import PackageDetails from "../Pages/Traveler/PackageDetails";
import Packages from "../Pages/Traveler/Packages";
import Blogs from "../Pages/Traveler/Blogs";
import Stays from "../Pages/Traveler/Stays";
import Flights from "../Pages/Traveler/Flights";
import Profile from "../Pages/Traveler/Profile";
import ChatPage from "../Pages/Traveler/ChatPage";
import CheckoutPage from "../Pages/Traveler/CheckoutPage";
import SuccessPage from "../Pages/Traveler/SuccessPage";
import Bookings from "../Pages/Traveler/Bookings";
import Error404 from "../Pages/Common/Error404";
import Video from "../Pages/Traveler/VideoChat";

export default function TravelerRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <IsLogged>
            <Home />
          </IsLogged>
        }
      />
      <Route
        path="/login"
        element={
          <IsLoggedOut>
            <Login />
          </IsLoggedOut>
        }
      />
      <Route
        path="/signup"
        element={
          <IsLoggedOut>
            <SignUp />
          </IsLoggedOut>
        }
      />
      <Route
        path="/otp"
        element={
          <IsLoggedOut>
            <Otp who="traveler" />
          </IsLoggedOut>
        }
      />
      <Route
        path="/forget_pass"
        element={
          <IsLoggedOut>
            <ForgetPass who="traveler" />
          </IsLoggedOut>
        }
      />
      <Route
        path="/new_pass"
        element={
          <IsLoggedOut>
            <NewPass who="traveler" />{" "}
          </IsLoggedOut>
        }
      />
      <Route
        path="/package_details/:id"
        element={
          <IsLogged>
            <PackageDetails />
          </IsLogged>
        }
      />
      <Route
        path="/packages"
        element={
          <IsLogged>
            <Packages />
          </IsLogged>
        }
      />
      <Route
        path="/blogs"
        element={
          <IsLogged>
            <Blogs />
          </IsLogged>
        }
      />
      <Route
        path="/stays"
        element={
          <IsLogged>
            <Stays />
          </IsLogged>
        }
      />
      <Route
        path="/flights"
        element={
          <IsLogged>
            <Flights />
          </IsLogged>
        }
      />
      <Route
        path="/profile"
        element={
          <IsLogged>
            <Profile />
          </IsLogged>
        }
      />
      <Route
        path="/chat"
        element={
          <IsLogged>
            <ChatPage />
          </IsLogged>
        }
      />
      <Route
        path="/checkout/:id"
        element={
          <IsLogged>
            <CheckoutPage />
          </IsLogged>
        }
      />
      <Route
        path="/success_page/:id"
        element={
          <IsLogged>
            <SuccessPage />
          </IsLogged>
        }
      />
      <Route
        path="/bookings"
        element={
          <IsLogged>
            <Bookings />
          </IsLogged>
        }
      />
      <Route
        path="/video/:roomId"
        element={
          <IsLogged>
            <Video />
          </IsLogged>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
