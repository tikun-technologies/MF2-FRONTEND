import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  // Get user - make sure remember parse object
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  useEffect(() => {
    console.log("🔄 Checking if stored auth data on mount...");
    const storedToken = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    if (storedToken) {
      console.log("✅ Token found:", storedToken);
      setToken(storedToken);
    }
    if (user) {
      console.log("User found:", user);
    }
  }, []);

  // Sync token with localstorage
  useEffect(() => {
    if (token) {
      console.log("📌 Storing token in localStorage:", token);
      localStorage.setItem("authToken", token);
    } else {
      console.warn("⚠️ Token removed from localStorage");
      localStorage.removeItem("authToken");
    }
  }, [token]);

  // Sync user with storage
  useEffect(() => {
    if (user) {
      console.log("📌 Storing user in localStorage:", user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.warn("⚠️ User removed from localStorage");
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (newToken, userData) => {
    console.log("🔓 Logging in user with token:", newToken);
    console.log("User data:", userData);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    console.warn("🚪 Logging out user...");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
