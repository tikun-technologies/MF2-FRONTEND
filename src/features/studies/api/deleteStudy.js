import API_BASE_URL from "../../../api/config";

export const deleteStudy = async (studyId, token) => {
  if (!token) throw new Error(`Unauthorized to delete study id:, ${studyId}`);

  const response = await fetch(`${API_BASE_URL}/study/${studyId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete study");
  }
};
