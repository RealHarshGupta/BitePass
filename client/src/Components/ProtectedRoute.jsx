import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, decodeToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const user = decodeToken();

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/" replace />;
  }

  // 🚩 Check if the user is an admin
  if (user?.role !== "admin") {
    console.warn("🚫 Access denied: Not an administrator.");
    localStorage.removeItem("token"); // Clear invalid/unauthorized token
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
