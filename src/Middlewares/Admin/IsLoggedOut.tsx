import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const IsLoggedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const logged = Cookies.get("adminToken");

  if (!logged) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/admin"} />;
  }
};

export default IsLoggedOut;
