import React from "react";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { RiArticleLine } from "react-icons/ri";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`${styles.sidebarContainer} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}
    >
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarTop}>
          <div className={styles.sidebarTab}>
            <GiBrain />
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${isActive ? styles.active : styles.sidebarLink}
                ${!isSidebarOpen ? styles.collapsedText : ""}
                `
                }
              >
                Studies
              </NavLink>
            </li>
          </div>

          <div className={styles.sidebarTab}>
            <RiArticleLine />
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                `${isActive ? styles.active : styles.sidebarLink} 
                ${!isSidebarOpen ? styles.collapsedText : ""}
              `
              }
            >
              Articles
            </NavLink>
          </div>
        </div>
        <div className={styles.sidebarBottom}>
          <div
            className={`${styles.sidebarTab} ${!isSidebarOpen && styles.sidebarTabCollapsed}`}
          >
            <CgProfile />
            <li>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `${isActive ? styles.active : styles.sidebarLink}
                ${!isSidebarOpen ? styles.collapsedText : ""}
                  `
                }
              >
                Rajesh
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
