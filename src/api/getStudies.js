const BASE_URL = "/api";

export async function getStudies() {
  try {
    const response = await fetch(`${BASE_URL}/studies`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    // Return data for outside function
    return data;
  } catch (error) {
    console.error(error.message);
    // Return error for outside function
    throw error;
  }
}

export async function getStudy(id) {
  try {
    const response = await fetch(`${BASE_URL}/studies`);
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
