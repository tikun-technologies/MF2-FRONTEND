import API_BASE_URL from "../../../api/config";

export const uploadStudy = async (file, token) => {
  if (!token) {
    console.error("❌ No token found! User is not authenticated.");
    throw new Error("Authentication token is missing.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

  console.log("📡 Sending request with token:", authHeader);

  try {
    const response = await fetch(`${API_BASE_URL}/add/study`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      console.error(
        "❌ API Response Error:",
        response.status,
        response.statusText
      );
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Upload Error:", error.message);
    throw new Error(error.message);
  }
};
