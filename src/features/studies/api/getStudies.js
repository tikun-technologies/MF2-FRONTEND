import API_BASE_URL from "../../../api/config";
import { authenticatedRequest } from "../../../middlewares/AuthMiddleware";

// ✅ Get all studies (Accept token as argument)
// ✅ Get all studies for the user (requires token to be passed in)
export async function getStudies(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/studies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching studies:", error.message);
    throw error;
  }
}

// Get Single Study

export async function getStudy(id, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/study/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching study by ID:", error.message);
    throw error;
  }
}
