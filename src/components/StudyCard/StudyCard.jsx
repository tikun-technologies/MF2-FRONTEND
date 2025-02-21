import React from "react";
import styles from "./StudyCard.module.css";
import Badge from "../Badges/Badge";
import SkeletonCard from "./SkeletonCard";

const StudyCard = ({ study }) => {
  // console.log(study);
  const { studyEnded, studyKeywords, studyStarted, studyStatus, studyTitle } =
    study;
  return (
    <div className={`global-border ${styles.studyContainer}`}>
      <h2 className={styles.studyTitle}>{studyTitle}</h2>
      <div className={styles.studyMeta}>
        <div className={styles.studyStatus}>
          <Badge
            type={
              /^\d{2}\/\d{2}\/\d{4}$/.test(studyStatus)
                ? "completed"
                : studyStatus
            }
            badgeText={
              /^\d{2}\/\d{2}\/\d{4}$/.test(studyStatus)
                ? "completed"
                : studyStatus
            }
          />

          {studyStarted && <p>{`Created on: ${studyStarted}`}</p>}
        </div>
      </div>
      <div className={styles.studySeo}>
        <ul className={styles.studyTags}>
          {studyKeywords?.map((keyword, index) => (
            <Badge badgeText={keyword} type="tag" key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudyCard;
