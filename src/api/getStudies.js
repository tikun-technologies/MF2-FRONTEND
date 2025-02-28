import API_BASE_URL from "./config";
import { authenticatedRequest } from "../middlewares/AuthMiddleware";

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

export async function getStudy(id, token) {
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
    const data = await response.json();
    const studies = data.studies;
    const study = studies.find((study) => study._id === id);
    return study;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
