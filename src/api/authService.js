import API_BASE_URL from "./config";
const SIGNUP_URL = `${API_BASE_URL}/signup`;
const LOGIN_URL = `${API_BASE_URL}/login`;

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("login response:", data);
    if (!response.ok) throw new Error(data.error || "Login Failed");

    return data; //This contains the token
  } catch (error) {
    return { error: error.message };
  }
};
