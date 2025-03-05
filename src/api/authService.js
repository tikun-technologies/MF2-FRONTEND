import API_BASE_URL from "./config";
const SIGNUP_URL = `${API_BASE_URL}/signup`;
const LOGIN_URL = `${API_BASE_URL}/login`;
const PASSWORD_RESET_URL = `${API_BASE_URL}/reset-password-request`;

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

// Reset Password Request
export const resetPasswordRequest = async (email) => {
  try {
    const response = await fetch(PASSWORD_RESET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log("Password reset response:", data);

    if (!response.ok) {
      // This ensures we throw an error for failed requests (4xx, 5xx)
      throw new Error(data.message || "Password Reset Request Failed");
    }

    return data; // Return success response
  } catch (error) {
    return { error: error.message };
  }
};

// Reset Password (Final Step)
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mf2/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass token in the header
      },
      body: JSON.stringify({ new_password: newPassword }), // Match API payload
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Password reset failed");
    }

    return data; // Success response
  } catch (error) {
    return { error: error.message };
  }
};
