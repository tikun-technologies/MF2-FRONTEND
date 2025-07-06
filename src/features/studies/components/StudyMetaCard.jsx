import React from "react";
import styles from "./StudyMetaCard.module.css";

const StudyMetaCard = ({ icon, header, subtext, theme }) => {
  return (
    <div className={styles.metaCard}>
      <div className={styles.metaCardInfo}>
        <div className={`${styles.metaCardIcon} ${styles[theme]}`}>{icon}</div>
        <div>
          <p className={styles.header}>{header}</p>
          <p className={styles.subtext}>{subtext}</p>
        </div>
      </div>
    </div>
  );
};

export default StudyMetaCard;
