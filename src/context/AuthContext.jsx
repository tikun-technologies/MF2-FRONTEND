import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  useEffect(() => {
    console.log("🔄 Checking if token exists on mount...");
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      console.log("✅ Token found:", storedToken);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("📌 Storing token in localStorage:", token);
      localStorage.setItem("authToken", token);
    } else {
      console.warn("⚠️ Token removed from localStorage");
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const login = (newToken) => {
    console.log("🔓 Logging in user with token:", newToken);
    setToken(newToken);
  };

  const logout = () => {
    console.warn("🚪 Logging out user...");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
