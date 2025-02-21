import React from "react";
import styles from "./StudyCard.module.css";
import shimmerStyles from "../../styles/Shimmer.module.css";
import Badge from "../Badges/Badge";
import Shimmer from "../common/Shimmer.jsx";

const SkeletonCard = ({}) => {
  // console.log(study);
  return (
    <div className={`global-border ${styles.studyContainer}`}>
      <h2 className={styles.studyTitle}>
        <Shimmer width="45%" height="20px" borderRadius="4px" />
      </h2>
      <div className={styles.studyMeta}>
        <div className={styles.studyStatus}>
          <Shimmer width="60px" height="24px" borderRadius="16px" />
          <Shimmer width="25%" height="20px" borderRadius="4px" />
        </div>
      </div>
      <div className={styles.studySeo}>
        <ul className={styles.studyTags}>
          {[...Array(3)].map((index) => (
            <Shimmer
              width="60px"
              height="24px"
              borderRadius="16px"
              key={index}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkeletonCard;
