import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, userType }) {
    // console.log("ProtectedRoute");
  try {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/" replace />;
    const decode = jwtDecode(token);
    // console.log(decode);
    if (decode.userType !== userType) return <Navigate to="/" replace />;
    return children;
  } catch (error) {
    return <Navigate to="/" replace />;
  }
}
