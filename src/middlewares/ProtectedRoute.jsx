import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 Checking authentication status...");
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    console.log("⏳ Still loading, preventing redirect...");
    return null; // Prevent redirecting before checking token
  }

  if (!token && window.location.pathname !== "/") {
    console.warn("🔄 No token found. Redirecting to login...");
    return <Navigate to="/login" />;
  }

  console.log("🔓 Access granted. Rendering protected route.");
  return <Outlet />;
};

export default ProtectedRoute;
