import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

interface MiddlewareProps {
  children: React.ReactNode;
}

const IsLoggedIn: React.FC<MiddlewareProps> = ({ children }) => {
  const logged = Cookies.get("adminToken");

  if (logged) {
    return <>{children}</>;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export default IsLoggedIn;
