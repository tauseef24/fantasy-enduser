import React from "react";
import Index from "../layouts/index";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const loginStatus = localStorage.getItem("AccessToken");
  return loginStatus ? (
    <Index>
      <Outlet />
    </Index>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
