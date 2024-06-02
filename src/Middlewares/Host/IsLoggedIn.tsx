import React from "react";
import { Navigate } from "react-router-dom";

interface MiddlewareProps {
  children: React.ReactNode;
}

const IsLoggedIn: React.FC<MiddlewareProps> = ({ children }) => {
  const signed = localStorage.getItem("host");
  if (signed) {
    return <>{children}</>;
  } else {
    return <Navigate to="/host/login" />;
  }
};

export default IsLoggedIn;
