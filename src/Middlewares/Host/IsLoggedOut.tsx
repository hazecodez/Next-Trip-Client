import React from "react";
import { Navigate } from "react-router-dom";

const IsLoggedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const signed = localStorage.getItem("host");

  if (!signed) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/host"} />;
  }
};

export default IsLoggedOut;
