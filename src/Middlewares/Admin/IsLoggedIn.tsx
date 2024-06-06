import React from "react";
// import { Navigate } from "react-router-dom";

interface MiddlewareProps {
  children: React.ReactNode;
}

const IsLoggedIn: React.FC<MiddlewareProps> = ({ children }) => {
  const logged = localStorage.getItem("adminToken")
  console.log("Logged aanallo",logged);
  return <>{children}</>;
  // if (logged) {
  //   return <>{children}</>;
  // } else {
  //   return <Navigate to="/admin/login" />;
  // }
};

export default IsLoggedIn;
