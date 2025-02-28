import { AuthProvider } from "../context/AuthContext";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
};

export default AppProviders;
