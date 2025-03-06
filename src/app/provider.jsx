import { AuthProvider } from "../context/AuthContext";
import { HelmetProvider } from "react-helmet-async";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const AppProviders = ({ children }) => {
  return (
    <HelmetProvider>
      <AuthProvider>
        {children}
        <ToastContainer position="top-right" autoClose={1000} />
      </AuthProvider>
    </HelmetProvider>
  );
};

export default AppProviders;
