import React from "react";
import { Navigate } from "react-router-dom";

const IsLoggedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const logged = localStorage.getItem("adminToken")

  if (!logged) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/admin"} />;
  }
};

export default IsLoggedOut;
