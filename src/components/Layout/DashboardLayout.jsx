import React, { useContext } from "react";
import Sidebar from "../common/Navbar/Sidebar";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useSidebar } from "../../context/SidebarContext";

const DashboardLayout = ({}) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  console.log("sidebar state:", isSidebarOpen);
  return (
    <div className={styles.layoutContainer}>
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <button
        className={`${styles.sidebarToggle} ${!isSidebarOpen && styles.buttonToggled}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <IoIosArrowDropleft className={styles.toggleIcon} />
        ) : (
          <IoIosArrowDropright className={styles.toggleIcon} />
        )}
      </button>

      <main
        className={`${styles.mainContent} ${!isSidebarOpen && styles.toggled}`}
      >
        {/* Fixed header section */}
        <div className={`container ${styles.header}`}>
          <h1>My Studies</h1>
        </div>
        {/* Scrollable Content */}
        <div className={styles.contentArea}>
          <Outlet /> {/* This will render correct page */}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
