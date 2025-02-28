import React from "react";
import styles from "./Sidebar.module.css";
import {
  IoHomeOutline,
  IoDocumentOutline,
  IoCreateOutline,
  IoNewspaperOutline,
  IoPeopleCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <button className={styles.sidebarToggle}>
        <IoArrowBackCircleOutline className={styles.sidebarIcon} />
      </button>

      <div className={styles.sidebarContent}>
        <div className={styles.sidebarTab}>
          <h4>Mind Genome</h4>
        </div>
        <div className={styles.sidebarTab}>
          <IoHomeOutline className={styles.sidebarIcon} />
          <h4>Home</h4>
        </div>
        <div className={styles.sidebarTab}>
          <IoDocumentOutline className={styles.sidebarIcon} />
          <h4>Studies</h4>
        </div>
        <div className={styles.sidebarTab}>
          <IoCreateOutline className={styles.sidebarIcon} />
          <h4>Create</h4>
        </div>
        <div className={styles.sidebarTab}>
          <IoNewspaperOutline className={styles.sidebarIcon} />

          <h4>Articles</h4>
        </div>
        <div className={styles.sidebarTab}>
          <IoNewspaperOutline className={styles.sidebarIcon} />
          <h4>Community</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
