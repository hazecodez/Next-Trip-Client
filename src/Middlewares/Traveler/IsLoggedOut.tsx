import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const IsLoggedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const logged = Cookies.get("travelerToken");
  const signed = Cookies.get("traveler");

  if (!logged && !signed) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};
export default IsLoggedOut;
