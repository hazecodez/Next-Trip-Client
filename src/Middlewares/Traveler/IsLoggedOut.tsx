import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const IsLoggedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signed = Cookies.get("traveler");

  if (!signed) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};
export default IsLoggedOut;
