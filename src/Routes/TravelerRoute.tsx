import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Traveler/Login";
import SignUp from "../Pages/Traveler/SignUp";
import Home from "../Pages/Traveler/Home";
import Otp from "../Components/Common/Otp";
import ForgetPass from "../Components/Common/ForgetPass";
import NewPass from "../Components/Common/NewPass";
import IsLogged from "../Middlewares/Traveler/IsLogged";
import IsLoggedOut from "../Middlewares/Traveler/IsLoggedOut";

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
      <Route path="/packages" />
      <Route path="/blogs" />
      <Route path="/stays" />
      <Route path="/flights" />
    </Routes>
  );
}
