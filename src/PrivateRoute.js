import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");

  // If token exists, allow access. Otherwise, redirect to login
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
