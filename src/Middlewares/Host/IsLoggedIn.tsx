import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

interface MiddlewareProps {
  children: React.ReactNode;
}

const IsLoggedIn: React.FC<MiddlewareProps> = ({ children }) => {
  const logged = Cookies.get("hostToken");
  const signed = Cookies.get("host");
  if (logged || signed) {
    return <>{children}</>;
  } else {
    return <Navigate to="/host/login" />;
  }
};

export default IsLoggedIn;
