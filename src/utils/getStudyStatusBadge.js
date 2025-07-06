export function getStudyStatusBadge(studyStatus) {
  const isDate = /^\d{2}\/\d{2}\/\d{4}$/.test(studyStatus);
  return {
    type: isDate ? "completed" : studyStatus,
    text: isDate ? "completed" : studyStatus,
  };
}
