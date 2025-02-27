import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// ✅ Correct way to access the token within components
export const useAuthToken = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthToken must be used within an AuthProvider");
  }
  return context.token;
};

// ✅ Middleware for authenticated API requests
export const authenticatedRequest = async (
  endpoint,
  method = "GET",
  body = null
) => {
  const token = localStorage.getItem("authToken"); // ✅ Use localStorage instead of useContext

  if (!token) {
    console.error("❌ No authentication token found!");
    throw new Error("Unauthorized: No token provided");
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (response.status === 401) {
      console.warn("⚠️ Token expired or invalid. Logging out...");
      localStorage.removeItem("authToken"); // ✅ Remove token on 401 error
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ API Request Failed:", error.message);
    throw error;
  }
};
