import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

interface MiddlewareProps {
  children: React.ReactNode;
}

const IsLogged: React.FC<MiddlewareProps> = ({ children }) => {
  const logged = Cookies.get("travelerToken");
  const signed = Cookies.get("traveler");
  if (logged || signed) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default IsLogged;
