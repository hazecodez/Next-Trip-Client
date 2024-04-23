import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const IsLoggedOut: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const logged = Cookies.get("hostToken");
  const signed = Cookies.get("host");

  if (!logged && !signed) {
    return <>{children}</>;
  }else {
    return <Navigate to={"/host"} />;
  }
};

export default IsLoggedOut;
