import React from "react";

import { Navigate } from "react-router-dom";

interface MiddlewareProps {
  children: React.ReactNode;
}

const IsLogged: React.FC<MiddlewareProps> = ({ children }) => {
  const signed = localStorage.getItem("traveler");
  if (signed) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default IsLogged;
