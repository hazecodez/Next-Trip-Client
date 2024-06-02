import React from "react";
import { Navigate } from "react-router-dom";

interface MiddlewareProps {
  children: React.ReactNode;
}

const IsLoggedIn: React.FC<MiddlewareProps> = ({ children }) => {
  const logged = localStorage.getItem("adminToken")

  if (logged) {
    return <>{children}</>;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export default IsLoggedIn;
